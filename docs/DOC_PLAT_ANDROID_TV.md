# Documentation for Android TV Platform

---

<img src="https://github.com/pavjacko/renative/blob/develop/docs/images/ic_androidtv.png?raw=true" width=50 height=50 />

## Android TV

![](https://img.shields.io/badge/Mac-yes-brightgreen.svg)
![](https://img.shields.io/badge/Windows-yes-brightgreen.svg)
![](https://img.shields.io/badge/Linux-yes-brightgreen.svg)
![](https://img.shields.io/badge/HostMode-n/a-lightgrey.svg)

<table>
  <tr>
    <th>
      <img src="https://github.com/pavjacko/renative/blob/develop/docs/images/rnv_android-tv.gif?raw=true" />
    </th>
  </tr>
</table>

-   Latest Android project
-   Kotlin Support
-   Support for Gradle 4.9

#### Requirements

-   [Android Studio](https://developer.android.com/studio/index.html) for Android development
-   [Android SDK](https://developer.android.com/sdk/) `23.0.1` or newer for Android development

#### Project Configuration

| Feature        | Version  |
| -------------- | :------: |
| Gradle         | `4.10.1` |
| Android Gradle | `3.3.1`  |
| Kotlin         | `1.3.20` |
| Target SDK     |   `27`   |

#### Run

NOTE: make sure you have 1 android device connected or 1 emulator running

```
rnv start
rnv run -p androidtv
```

#### Advanced

Clean and Re-build platform project

```
rnv run -p androidtv -r
```

Launch specific emulator:

```
rnv target launch -p androidtv -t Android_TV_720p_API_22
```

#### App Config

<a href="#android-based-config">see: Android based config</a>