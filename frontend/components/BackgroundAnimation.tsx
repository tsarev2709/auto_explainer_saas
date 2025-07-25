import React from 'react'

export default function BackgroundAnimation() {
  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      <svg className="wave w-full h-full text-brandTurquoise opacity-30" viewBox="0 0 1440 320" preserveAspectRatio="none">
        <path
          className="fill-current wave"
          d="M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,128C672,128,768,160,864,181.3C960,203,1056,213,1152,192C1248,171,1344,117,1392,90.7L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
        />
      </svg>
      <div className="absolute top-20 left-1/4 w-32 h-32 bg-brandPink rounded-full opacity-50 circle" />
      <div className="absolute bottom-20 right-1/4 w-24 h-24 bg-brandYellow rounded-full opacity-70 circle" />
    </div>
  )
}
