import React, { useState, Fragment } from "react";
import { isIos, iosDevice, isPwa, isSafari } from "./pwa-const";
export { isIos, iosDevice, isPwa, isSafari } from "./pwa-const";
import { useBeforeInstallPrompt, useWindowResize } from "./hooks";
export { useBeforeInstallPrompt, useWindowResize } from "./hooks";
import s from "./PwaIosInstallInvitation.module.css";

const PwaIosInstallInvitation = ({
  showPwaInvitation = true,
  iosInvitationTimeout = 0,
  iosInvitationOnlySafari = false,
  iosInvitationContent = (
    <Fragment>
      Install this webapp on your {iosDevice}: tap <IconShareIos /> and then Add
      to Home Screen
    </Fragment>
  )
}) => {
  const showPwaInstallInvitation =
    typeof showPwaInvitation === "function"
      ? showPwaInvitation()
      : showPwaInvitation;

  // hide invitation on android if not deeded to show
  useBeforeInstallPrompt(
    e => {
      !showPwaInstallInvitation && e.preventDefault();
    },
    [showPwaInstallInvitation]
  );

  // Detect if was closed within week
  const lastDate = localStorage.getItem("PwaIosInstallInvitationLastCloseDate");
  const closedWitinTimeout = Date.now() - lastDate < iosInvitationTimeout;

  return showPwaInstallInvitation &&
    isIos &&
    !isPwa &&
    (!iosInvitationOnlySafari || isSafari) &&
    !closedWitinTimeout ? (
    <PwaIosInstallInvitationContent
      iosDevice={iosDevice}
      iosInvitationContent={iosInvitationContent}
    />
  ) : null;
};

export default PwaIosInstallInvitation;

const PwaIosInstallInvitationContent = ({
  iosDevice,
  iosInvitationContent
}) => {
  // visible hook
  const [visible, setVisible] = useState(true);

  if (typeof iosInvitationContent === "function") {
    iosInvitationContent(iosDevice);
  }

  // calc position
  const getPosition = () => {
    const landscape = window.innerHeight < window.innerWidth;
    const ifSEOrLower = window.innerHeight <= 320 || window.innerWidth <= 320;
    const iPad = iosDevice === "iPad";

    return iPad || (landscape && !ifSEOrLower) ? "top" : "bottom";
  };

  // position hook
  const [position, setPosition] = useState(getPosition());

  // re-calc position on resize
  useWindowResize(() => {
    setPosition(getPosition());
  }, [visible]);

  // close handler
  const setCloseDate = () => {
    localStorage.setItem("PwaIosInstallInvitationLastCloseDate", Date.now());
    setVisible(false);
  };

  return !visible ? null : (
    <div className={[s.iosInvitationContainer, s[position]].join(" ")}>
      <div className={s.triangleShadow}></div>

      <div className={s.iosInvitation}>
        <div onClick={setCloseDate} className={s.closeIconContainer}>
          <IconClosePanel />
        </div>

        {iosInvitationContent}
      </div>

      <div className={[s.triangle, s[iosDevice]].join(" ")}></div>
    </div>
  );
};

const IconClosePanel = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 16 16"
  >
    <path
      fill="#37434E"
      fillRule="evenodd"
      d="M9.273 8l4.463-4.463a.9.9 0 1 0-1.273-1.273L8 6.726 3.537 2.264a.9.9 0 1 0-1.273 1.273L6.727 8l-4.463 4.463a.9.9 0 1 0 1.273 1.273L8 9.273l4.463 4.463a.9.9 0 1 0 1.273-1.273L9.273 8z"
    />
  </svg>
);

export const IconShareIos = ({ className = "" }) => (
  <svg
    className={[s.iconShareIos, className].join(" ")}
    xmlns="http://www.w3.org/2000/svg"
    width="13"
    height="19"
    viewBox="0 0 13 19"
  >
    <g fill="none" fillRule="evenodd" stroke="#007BFD">
      <path
        strokeLinecap="square"
        d="M3.1 3.9L6.9.1M9.9 3.9L6.1.1M6.5 1.086v10.828"
      />
      <path d="M9 6.5h3.5v12H.5v-12H4" />
    </g>
  </svg>
);
