import { useEffect, useState } from 'react'

export function useScrollSpy(sectionIds: string[], offset = 120): string {
  const [activeId, setActiveId] = useState(sectionIds[0] ?? '')

  useEffect(() => {
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter((el): el is HTMLElement => el !== null)

    if (elements.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)

        if (visible.length > 0 && visible[0].target.id) {
          setActiveId(visible[0].target.id)
        }
      },
      {
        rootMargin: `-${offset}px 0px -55% 0px`,
        threshold: [0, 0.15, 0.35, 0.55],
      },
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [sectionIds, offset])

  return activeId
}
