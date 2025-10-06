import re
from typing import Dict, Optional
from urllib.parse import urlparse


class PlatformDetector:
    """Detect platform from URL"""
    
    PLATFORM_PATTERNS = {
        'youtube': [
            r'(youtube\.com|youtu\.be)',
        ],
        'instagram': [
            r'instagram\.com',
        ],
        'tiktok': [
            r'tiktok\.com',
            r'vm\.tiktok\.com',
        ],
        'twitter': [
            r'twitter\.com',
            r'x\.com',
        ],
        'facebook': [
            r'facebook\.com',
            r'fb\.watch',
        ],
        'dailymotion': [
            r'dailymotion\.com',
            r'dai\.ly',
        ],
        'pinterest': [
            r'pinterest\.com',
            r'pin\.it',
        ],
        'vimeo': [
            r'vimeo\.com',
        ],
        'soundcloud': [
            r'soundcloud\.com',
        ],
    }
    
    def detect(self, url: str) -> Optional[Dict[str, str]]:
        """Detect platform from URL"""
        if not url:
            return None
        
        # Parse URL
        try:
            parsed = urlparse(url)
            domain = parsed.netloc.lower()
        except Exception:
            return None
        
        # Check each platform
        for platform, patterns in self.PLATFORM_PATTERNS.items():
            for pattern in patterns:
                if re.search(pattern, domain, re.IGNORECASE):
                    return {
                        'platform': platform,
                        'url': url,
                        'domain': domain
                    }
        
        return None
