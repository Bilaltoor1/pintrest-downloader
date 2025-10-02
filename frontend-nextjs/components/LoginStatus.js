'use client'

import { useState } from 'react'
import axios from 'axios'
import styles from './LoginStatus.module.css'

export default function LoginStatus({ hasCookies, onCookiesUpdate, apiUrl }) {
  const [showLogin, setShowLogin] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [authLoading, setAuthLoading] = useState(false)
  const [authError, setAuthError] = useState(null)

  const handleLogin = async () => {
    setAuthLoading(true)
    setAuthError(null)

    try {
      await axios.post(`${apiUrl}/api/login`, {
        email,
        password,
      })
      alert('Successfully logged in!')
      onCookiesUpdate()
      setShowLogin(false)
      setEmail('')
      setPassword('')
    } catch (error) {
      setAuthError(error.response?.data?.error || 'Login failed. Please check your credentials.')
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <>
      <div className={styles.loginStatus}>
        {hasCookies ? (
          <span className={`${styles.statusBadge} ${styles.success}`}>
            ✓ Logged In (Private boards accessible)
          </span>
        ) : (
          <span className={`${styles.statusBadge} ${styles.warning}`}>
            ⚠ Not logged in (Public only)
          </span>
        )}
        <button 
          onClick={() => setShowLogin(!showLogin)} 
          className={styles.btnSecondary}
        >
          {showLogin ? 'Cancel' : 'Login to Pinterest'}
        </button>
      </div>

      {showLogin && (
        <div className={styles.loginForm}>
          <h3>Login to Pinterest</h3>
          <input
            type="email"
            placeholder="Pinterest Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className={styles.input}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button 
            onClick={handleLogin} 
            disabled={authLoading} 
            className={styles.btnPrimary}
          >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>
          {authError && <p className={styles.errorInline}>{authError}</p>}
        </div>
      )}
    </>
  )
}
