export function QAShape({ isMobile }: { isMobile: boolean }) {
  const viewBox = isMobile ? '-33 320 636 480' : '-150 -150 903 1344'
  return (
    <svg
      width="100%"
      height="100%"
      viewBox={viewBox}
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      xmlns="http://www.w3.org/2000/svg"
    >
      {!isMobile && <path d="M0 700.835L603 1044V328.682L0 0V700.835Z" fill="#E8EDF2" />}
      <path d="M397 356H124V522H397V356Z" stroke="#5E5EFF" strokeWidth="14" />
      <path d="M301 426H446" stroke="#021F53" strokeWidth="14" />
      <path d="M301 458H446" stroke="#5E5EFF" strokeWidth="14" />
    </svg>
  )
}
