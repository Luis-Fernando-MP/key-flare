import type { JSX } from 'react'

const Jules = (): JSX.Element => {
  return (
    <svg viewBox='0 0 58 67' fill='none'>
      <g filter='url(#filter0_d_24_66)'>
        <path
          d='M54 33.1081C54 46.9152 42.8071 58.1081 29 58.1081C15.1929 58.1081 4 46.9152 4 33.1081C4 19.301 15.1929 8.10811 29 8.10811C42.8071 8.10811 54 19.301 54 33.1081Z'
          fill='#E8EEFF'
        />
        <path
          d='M19.097 54.7845C30.1001 46.2207 36.6811 46.7671 48.3878 54.2413C41.9291 39.5182 45.1024 34.0178 54 27.5475C32.5923 30.9311 23.5546 36.1733 19.097 54.7845Z'
          fill='url(#paint0_linear_24_66)'
        />
        <path
          d='M17.3287 52.4566C20.9935 30.9409 15.0224 27.5475 13.7154 20.0204C12.4085 12.4934 16.4212 8.19963 18.6357 6.67347C20.8502 5.14731 33.328 2.83986 35.0109 0L46.9271 1.24158C37.4133 4.03515 34.6062 6.36814 31.3207 12.4158C29.9226 16.424 29.3011 19.9112 28.2455 26.5387C25.5549 36.7816 22.9989 42.4431 17.3287 52.4566Z'
          fill='url(#paint1_linear_24_66)'
        />
      </g>
      <defs>
        <filter
          id='filter0_d_24_66'
          x='0'
          y='0'
          width='58'
          height='66.1082'
          filterUnits='userSpaceOnUse'
          colorInterpolationFilters='sRGB'
        >
          <feFlood floodOpacity='0' result='BackgroundImageFix' />
          <feColorMatrix
            in='SourceAlpha'
            type='matrix'
            values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0'
            result='hardAlpha'
          />
          <feOffset dy='4' />
          <feGaussianBlur stdDeviation='2' />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix type='matrix' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend mode='normal' in2='BackgroundImageFix' result='effect1_dropShadow_24_66' />
          <feBlend mode='normal' in='SourceGraphic' in2='effect1_dropShadow_24_66' result='shape' />
        </filter>
        <linearGradient
          id='paint0_linear_24_66'
          x1='35.6667'
          y1='17.9167'
          x2='16.0286'
          y2='42.3827'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#32AAFF' />
          <stop offset='0.431417' stopColor='#2F40FF' />
          <stop offset='0.771417' stopColor='#201A6B' />
          <stop offset='1' stopColor='#0D0B2E' />
        </linearGradient>
        <linearGradient
          id='paint1_linear_24_66'
          x1='35.6667'
          y1='17.9167'
          x2='16.0286'
          y2='42.3827'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#32AAFF' />
          <stop offset='0.431417' stopColor='#2F40FF' />
          <stop offset='0.771417' stopColor='#201A6B' />
          <stop offset='1' stopColor='#0D0B2E' />
        </linearGradient>
      </defs>
    </svg>
  )
}

export default Jules
