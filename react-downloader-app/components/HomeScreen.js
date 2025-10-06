import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Image,
  ActivityIndicator,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import apiClient from '../utils/apiClient';

export default function HomeScreen() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [metadata, setMetadata] = useState(null);
  const [platform, setPlatform] = useState(null);
  const [downloadType, setDownloadType] = useState('video'); // 'video' or 'audio'

  const supportedPlatforms = [
    { name: 'YouTube', icon: 'logo-youtube', color: '#FF0000' },
    { name: 'Instagram', icon: 'logo-instagram', color: '#E1306C' },
    { name: 'TikTok', icon: 'musical-notes', color: '#000000' },
    { name: 'Twitter', icon: 'logo-twitter', color: '#1DA1F2' },
    { name: 'Facebook', icon: 'logo-facebook', color: '#1877F2' },
    { name: 'Dailymotion', icon: 'play-circle', color: '#0066DC' },
  ];

  const handleFetchMetadata = async () => {
    if (!url.trim()) {
      Alert.alert('Error', 'Please enter a URL');
      return;
    }

    setLoading(true);
    setMetadata(null);
    setPlatform(null);

    try {
      const response = await apiClient.post('/fetch-metadata', { url: url.trim() });
      setMetadata(response.data.metadata);
      setPlatform(response.data.platform);
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || 'Failed to fetch video information');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (type = 'video', quality = 'best') => {
    setLoading(true);

    try {
      const endpoint = type === 'video' ? '/download-video' : '/download-audio';
      const response = await apiClient.post(endpoint, {
        url: url.trim(),
        quality: quality,
      });

      if (response.data.success) {
        Alert.alert(
          'Success',
          `${type === 'video' ? 'Video' : 'Audio'} downloaded successfully!\\n\\nFilename: ${response.data.filename}`,
          [
            {
              text: 'OK',
              onPress: () => {
                // Here you can add logic to show the file in downloads or play it
              },
            },
          ]
        );
      }
    } catch (error) {
      Alert.alert('Error', error.response?.data?.error || `Failed to download ${type}`);
    } finally {
      setLoading(false);
    }
  };

  const formatDuration = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Video Downloader</Text>
        <Text style={styles.subtitle}>Download videos & music from any platform</Text>
      </View>

      {/* URL Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Paste video URL here..."
          placeholderTextColor="#999"
          value={url}
          onChangeText={setUrl}
          autoCapitalize="none"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.fetchButton}
          onPress={handleFetchMetadata}
          disabled={loading}
        >
          {loading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Ionicons name="search" size={24} color="#fff" />
          )}
        </TouchableOpacity>
      </View>

      {/* Supported Platforms */}
      <View style={styles.platformsContainer}>
        <Text style={styles.sectionTitle}>Supported Platforms</Text>
        <View style={styles.platformsGrid}>
          {supportedPlatforms.map((platform, index) => (
            <View key={index} style={styles.platformItem}>
              <View style={[styles.platformIcon, { backgroundColor: platform.color }]}>
                <Ionicons name={platform.icon} size={24} color="#fff" />
              </View>
              <Text style={styles.platformName}>{platform.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Metadata Display */}
      {metadata && (
        <View style={styles.metadataContainer}>
          {metadata.thumbnail && (
            <Image
              source={{ uri: metadata.thumbnail }}
              style={styles.thumbnail}
              resizeMode="cover"
            />
          )}

          <Text style={styles.videoTitle}>{metadata.title}</Text>

          <View style={styles.statsRow}>
            {metadata.duration > 0 && (
              <View style={styles.stat}>
                <Ionicons name="time-outline" size={16} color="#666" />
                <Text style={styles.statText}>{formatDuration(metadata.duration)}</Text>
              </View>
            )}
            {metadata.view_count > 0 && (
              <View style={styles.stat}>
                <Ionicons name="eye-outline" size={16} color="#666" />
                <Text style={styles.statText}>
                  {metadata.view_count.toLocaleString()} views
                </Text>
              </View>
            )}
          </View>

          {metadata.uploader && (
            <Text style={styles.uploader}>By {metadata.uploader}</Text>
          )}

          {/* Download Type Toggle */}
          <View style={styles.toggleContainer}>
            <TouchableOpacity
              style={[
                styles.toggleButton,
                downloadType === 'video' && styles.toggleButtonActive,
              ]}
              onPress={() => setDownloadType('video')}
            >
              <Ionicons
                name="videocam"
                size={20}
                color={downloadType === 'video' ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.toggleText,
                  downloadType === 'video' && styles.toggleTextActive,
                ]}
              >
                Video
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.toggleButton,
                downloadType === 'audio' && styles.toggleButtonActive,
              ]}
              onPress={() => setDownloadType('audio')}
            >
              <Ionicons
                name="musical-notes"
                size={20}
                color={downloadType === 'audio' ? '#fff' : '#666'}
              />
              <Text
                style={[
                  styles.toggleText,
                  downloadType === 'audio' && styles.toggleTextActive,
                ]}
              >
                Audio
              </Text>
            </TouchableOpacity>
          </View>

          {/* Quality Options */}
          <View style={styles.qualityContainer}>
            <TouchableOpacity
              style={styles.downloadButton}
              onPress={() => handleDownload(downloadType, 'best')}
              disabled={loading}
            >
              <Ionicons name="download" size={20} color="#fff" />
              <Text style={styles.downloadButtonText}>
                Download Best Quality
              </Text>
            </TouchableOpacity>

            {downloadType === 'video' && (
              <View style={styles.qualityButtons}>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('video', '720')}
                >
                  <Text style={styles.qualityButtonText}>720p</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('video', '480')}
                >
                  <Text style={styles.qualityButtonText}>480p</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('video', '360')}
                >
                  <Text style={styles.qualityButtonText}>360p</Text>
                </TouchableOpacity>
              </View>
            )}

            {downloadType === 'audio' && (
              <View style={styles.qualityButtons}>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('audio', 'high')}
                >
                  <Text style={styles.qualityButtonText}>320kbps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('audio', 'medium')}
                >
                  <Text style={styles.qualityButtonText}>192kbps</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.qualityButton}
                  onPress={() => handleDownload('audio', 'low')}
                >
                  <Text style={styles.qualityButtonText}>128kbps</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        </View>
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#6200ee',
    padding: 20,
    paddingTop: 60,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#e0e0e0',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 15,
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  fetchButton: {
    backgroundColor: '#6200ee',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  platformsContainer: {
    padding: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
  },
  platformsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  platformItem: {
    width: '30%',
    alignItems: 'center',
    marginBottom: 15,
  },
  platformIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  platformName: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  metadataContainer: {
    backgroundColor: '#fff',
    margin: 15,
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  thumbnail: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 15,
  },
  videoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  statsRow: {
    flexDirection: 'row',
    marginBottom: 10,
  },
  stat: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  statText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 5,
  },
  uploader: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
  },
  toggleContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 4,
  },
  toggleButton: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 12,
    borderRadius: 6,
  },
  toggleButtonActive: {
    backgroundColor: '#6200ee',
  },
  toggleText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
    fontWeight: '600',
  },
  toggleTextActive: {
    color: '#fff',
  },
  qualityContainer: {
    marginTop: 10,
  },
  downloadButton: {
    backgroundColor: '#6200ee',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
  },
  downloadButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  qualityButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  qualityButton: {
    flex: 1,
    backgroundColor: '#e0e0e0',
    padding: 12,
    borderRadius: 8,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  qualityButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
  },
});
