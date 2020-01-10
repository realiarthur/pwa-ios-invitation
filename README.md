# pwa-ios-invitation

PWA invitation for iOS (located in right place for different devices) and few utils usefull for PWA.

## `<PwaIosInstallInvitation/>`

PWA invitation component on iOS style, located in a bottom for iPhones portrait and in top for iPad and iPhones landscape (greater iPhone SE)

```jsx
import React, { Fragment } from 'react'
import PwaIosInstallInvitation, { IconShareIos } from 'pwa-const-and-invitation'

ReactDOM.render(
  <Fragment>
    <App />

    <PwaIosInstallInvitation
      showPwaInvitation={true}
      iosInvitationTimeout={10000}
      iosInvitationOnlySafari={true}
      iosInvitationContent={
        (iosDevice)=>
          <Fragment>
            Install my awesome webapp on your {iosDevice}: tap <IconShareIos /> and then Add to Home Screen
          </Fragment>
      }
    />

  </Fragment>,
  document.getElementById('root')
)
```

| Prop                    | Type                               | Default                                                                                       | Description                                                                          |
| ----------------------- | ---------------------------------- | --------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------ |
| showPwaInvitation       | bool or function::bool             | true                                                                                          | Value or function that set PWA invitation visablity. It's affect Android devices too |
| iosInvitationTimeout    | int                                | 0                                                                                             | Milliseconds after last closing PWA invitation on ios to show it again               |
| iosInvitationOnlySafari | bool                               | false                                                                                         | Set to true to show invitation on ios only in Safari                                 |
| iosInvitationContent    | string, jsx or function(iosDevice) | "Install this webapp on your {iosDevice}: tap `<IconShareIos />` and then Add to Home Screen" | Ios invitation content                                                               |


## Consts

Consts that can be usefull with PWA works

```jsx
// use this one to reduce bundle size, if you need only const
import { isPwa, isIos, iosDevice, isSafari } from 'pwa-const-and-invitation/const' 

// or you can use this one, if you use invitation too
import { isPwa, isIos, iosDevice, isSafari } from 'pwa-const-and-invitation'
```

| Prop      | Type   | Description                       |
| --------- | ------ | --------------------------------- |
| isPwa     | bool   | true if application run as PWA    |
| isIos     | bool   | equal true if device based on ios |
| iosDevice | string | iPhone or iPad or iPod            |
| isSafari  | bool   | true if it Safari and NOT Chrome  |



## IconShareIos

Ios style "Share" icon. You can use it for iosInvitationContent

```jsx
import { IconShareIos } from 'pwa-const-and-invitation'
```

| Prop      | Type   | Description                         |
| --------- | ------ | ----------------------------------- |
| className | string | Custom css class for icon component |



## useWindowBeforeInstallPrompt

Hook for default PWA install invitation event


```jsx
// use this one to reduce bundle size, if you need only const
import { IconShareIos } from 'pwa-const-and-invitation/hooks'

// or you can use this one, if you use invitation too
import { IconShareIos } from 'pwa-const-and-invitation'
```