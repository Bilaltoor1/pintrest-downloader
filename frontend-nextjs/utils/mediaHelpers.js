export const resolveMediaUrl = (item = {}) => {
  const candidates = [
    item.image_url,
    item.url,
    item.media_url,
    item.content_url,
    item.thumbnail_url,
    item.cover_image_url,
    item.link,
    item.href,
    item.permalink,
    item.src, // Add src property for Pinterest API response
  ]

  if (item.original?.url) {
    candidates.push(item.original.url)
  }

  if (item.source_url) {
    candidates.push(item.source_url)
  }

  if (item.images) {
    if (Array.isArray(item.images)) {
      item.images.forEach((img) => {
        if (!img) return
        if (typeof img === 'string') {
          candidates.push(img)
        } else if (typeof img === 'object' && img.url) {
          candidates.push(img.url)
        }
      })
    } else if (typeof item.images === 'object') {
      Object.values(item.images).forEach((img) => {
        if (!img) return
        if (typeof img === 'string') {
          candidates.push(img)
        } else if (img.url) {
          candidates.push(img.url)
        }
      })
    }
  }

  return candidates.find((value) => typeof value === 'string' && value.startsWith('http')) || ''
}

export const resolveVideoUrl = (item = {}) => {
  const candidates = [
    item.video_url,
    item.videoUrl,
    item?.videos?.video_list?.V_1080P?.url,
    item?.videos?.video_list?.V_720P?.url,
    item?.videos?.video_list?.V_480P?.url,
    item?.videos?.video_list?.V_360P?.url,
    item?.videos?.video_list?.V_240P?.url,
    item?.videos?.video_list?.V_144P?.url,
  ]

  const visit = (value) => {
    if (!value) return
    if (typeof value === 'string') {
      candidates.push(value)
      return
    }
    if (Array.isArray(value)) {
      value.forEach(visit)
      return
    }
    if (typeof value === 'object') {
      Object.values(value).forEach(visit)
    }
  }

  visit(item.videos)
  visit(item.video)

  return candidates.find((value) => typeof value === 'string' && value.startsWith('http')) || ''
}

export const getPrimaryMedia = (item = {}) => {
  const videoSrc = resolveVideoUrl(item)
  if (videoSrc) {
    return { type: 'video', src: videoSrc }
  }

  const imageSrc = resolveMediaUrl(item)
  if (imageSrc) {
    return { type: 'image', src: imageSrc }
  }

  return null
}

const pickDimension = (candidates = []) =>
  candidates.find((value) => typeof value === 'number' && Number.isFinite(value) && value > 0)

export const getResolution = (item = {}) => {
  const dims = item.dimensions || item.dimension || item.original_dimensions || item.original_size || {}
  const width = pickDimension([
    item.width,
    item.image_width,
    item.media_width,
    item.original_width,
    item.resource_width,
    dims.width,
    item.size?.width,
  ])
  const height = pickDimension([
    item.height,
    item.image_height,
    item.media_height,
    item.original_height,
    item.resource_height,
    dims.height,
    item.size?.height,
  ])

  if (width && height) {
    return `${width}×${height}`
  }
  return '—'
}

export const getAltText = (item = {}) =>
  item.alt || item.description || item.title || item.note || item.rich_summary?.display_name || '—'

export const getPinTitle = (item = {}) => {
  const candidates = [
    item.title,
    item.grid_title,
    item.page_title,
    item.rich_metadata?.title,
    item.rich_summary?.display_name,
    item.note,
    item.description,
  ]

  return candidates.find((value) => typeof value === 'string' && value.trim()) || 'Pinterest Pin'
}
