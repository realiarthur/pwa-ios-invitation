import React, { useState } from 'react'
import { isIos, iosDevice, isPwa, isSafari } from './pwa-const'
import { useBeforeInstallPrompt, useWindowResize } from './hooks'
import s from './PwaIosInstallInvitation.module.css'

export { isIos, iosDevice, isPwa, isSafari } from './pwa-const'
export { useBeforeInstallPrompt, useWindowResize } from './hooks'

const PwaIosInstallInvitation = ({
  showPwaInvitation = true,
  iosInvitationTimeout = 0,
  iosInvitationOnlySafari = false,

  iosInvitationHeader = (iosDevice) =>
    `Install this webapp on your ${iosDevice}`,
  iosInvitationContent = (
    <>
      Open this page in Safari, tap <IconShareIos /> and then <br></br>
      Add to Home Screen <IconHomeScreen />
    </>
  ),
}) => {
  const showPwaInstallInvitation =
    typeof showPwaInvitation === 'function'
      ? showPwaInvitation()
      : showPwaInvitation

  // hide invitation on android if not needed to show
  useBeforeInstallPrompt(
    (e) => {
      !showPwaInstallInvitation && e.preventDefault()
    },
    [showPwaInstallInvitation]
  )

  // Detect if was closed within week
  const lastDate = localStorage.getItem('PwaIosInstallInvitationLastCloseDate')
  const closedWitinTimeout = Date.now() - lastDate < iosInvitationTimeout

  return showPwaInstallInvitation &&
    isIos &&
    !isPwa &&
    (!iosInvitationOnlySafari || isSafari) &&
    !closedWitinTimeout ? (
    <PwaIosInstallInvitationContent
      iosDevice={iosDevice}
      iosInvitationHeader={iosInvitationHeader}
      iosInvitationContent={iosInvitationContent}
    />
  ) : null
}

export default PwaIosInstallInvitation

const PwaIosInstallInvitationContent = ({
  iosDevice,
  iosInvitationHeader,
  iosInvitationContent,
}) => {
  // visible hook
  const [visible, setVisible] = useState(true)

  if (typeof iosInvitationHeader === 'function') {
    iosInvitationHeader = iosInvitationHeader(iosDevice)
  }

  if (typeof iosInvitationContent === 'function') {
    iosInvitationContent = iosInvitationContent(iosDevice)
  }

  // calc position
  const getPosition = () => {
    const landscape = window.innerHeight < window.innerWidth
    const ifSEOrLower = window.innerHeight <= 320 || window.innerWidth <= 320
    const iPad = iosDevice === 'iPad'

    return iPad || (landscape && !ifSEOrLower) ? 'top' : 'bottom'
  }

  // position hook
  const [position, setPosition] = useState(getPosition())

  // re-calc position on resize
  useWindowResize(() => {
    setPosition(getPosition())
  }, [visible])

  // close handler
  const setCloseDate = () => {
    localStorage.setItem('PwaIosInstallInvitationLastCloseDate', Date.now())
    setVisible(false)
  }

  return !visible ? null : (
    <div className={[s.iosInvitationContainer, s[position]].join(' ')}>
      <div className={s.triangleShadow}></div>

      <div className={s.iosInvitation}>
        <div className={s.iosInvitationHeader}>
          <div className={s.iosInvitationHeaderText}>{iosInvitationHeader}</div>
          <div onClick={setCloseDate} className={s.closeIconContainer}>
            <IconClosePanel />
          </div>
        </div>

        {iosInvitationContent}
      </div>

      <div className={[s.triangle, s[iosDevice]].join(' ')}></div>
    </div>
  )
}

const IconClosePanel = () => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    width='16'
    height='16'
    viewBox='0 0 16 16'
  >
    <path
      fill='var(--ios-install-invitation-text-color)'
      fillRule='evenodd'
      d='M9.273 8l4.463-4.463a.9.9 0 1 0-1.273-1.273L8 6.726 3.537 2.264a.9.9 0 1 0-1.273 1.273L6.727 8l-4.463 4.463a.9.9 0 1 0 1.273 1.273L8 9.273l4.463 4.463a.9.9 0 1 0 1.273-1.273L9.273 8z'
    />
  </svg>
)

export const IconShareIos = ({ className = '' }) => (
  <svg
    className={[s.iconShareIos, className].join(' ')}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 566 670'
    fill='#007aff'
    width='20'
    height='25'
  >
    <path d='M255 12c4-4 10-8 16-8s12 3 16 8l94 89c3 4 6 7 8 12 2 6 0 14-5 19-7 8-20 9-28 2l-7-7-57-60 2 54v276c0 12-10 22-22 22-12 1-24-10-23-22V110l1-43-60 65c-5 5-13 8-21 6a19 19 0 0 1-16-17c-1-7 2-13 7-18l95-91z' />
    <path d='M43 207c16-17 40-23 63-23h83v46h-79c-12 0-25 3-33 13-8 9-10 21-10 33v260c0 13 0 27 6 38 5 12 18 18 30 19l14 1h302c14 0 28 0 40-8 11-7 16-21 16-34V276c0-11-2-24-9-33-8-10-22-13-34-13h-78v-46h75c13 0 25 1 37 4 16 4 31 13 41 27 11 17 14 37 14 57v280c0 20-3 41-15 58a71 71 0 0 1-45 27c-11 2-23 3-34 3H109c-19-1-40-4-56-15-14-9-23-23-27-38-4-12-5-25-5-38V270c1-22 6-47 22-63z' />
  </svg>
)

export const IconHomeScreen = ({ className = '' }) => (
  <svg
    className={[s.iconShareIos, className].join(' ')}
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 578 584'
    width='20'
    height='21'
  >
    <path d='M101 35l19-1h333c12 0 23 0 35 3 17 3 34 12 44 27 13 16 16 38 16 58v329c0 19 0 39-8 57a65 65 0 0 1-37 37c-18 7-38 7-57 7H130c-21 1-44 0-63-10-14-7-25-20-30-34-6-15-8-30-8-45V121c1-21 5-44 19-61 13-16 33-23 53-25m7 46c-10 1-19 6-24 14-7 8-9 20-9 31v334c0 12 2 25 10 34 9 10 23 12 35 12h336c14 1 30-3 38-15 6-9 8-20 8-31V125c0-12-2-24-10-33-9-9-22-12-35-12H121l-13 1z' />
    <path d='M271 161c9-11 31-10 38 4 3 5 3 11 3 17v87h88c7 0 16 1 21 7 6 6 7 14 6 22a21 21 0 0 1-10 14c-5 4-11 5-17 5h-88v82c0 7-1 15-6 20-10 10-29 10-37-2-3-6-4-13-4-19v-81h-87c-8-1-17-3-23-9-5-6-6-15-4-22a21 21 0 0 1 11-14c6-3 13-3 19-3h84v-88c0-7 1-14 6-20z' />
  </svg>
)
