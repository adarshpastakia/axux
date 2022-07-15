# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-beta.10](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.9...v2.0.0-beta.10) (2022-07-15)


### Bug Fixes

* **AppContext:** toggle theme wrong className ([142db61](https://github.com/adarshpastakia/axux/commit/142db610a28ef07df8adbd6c75c74abb91a85ebc))





# [2.0.0-beta.9](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.8...v2.0.0-beta.9) (2022-07-15)


### Bug Fixes

* **bundle:** remove src from npm package ([c4155e0](https://github.com/adarshpastakia/axux/commit/c4155e0ed9dff1e0ec1bf3ff7a1368961528dca8))
* **TabPanel, Callout:** bad import resolution ([7b8525b](https://github.com/adarshpastakia/axux/commit/7b8525b8f90e3f7c3b5ffd7842c5030a7f07106a))





# [2.0.0-beta.8](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.7...v2.0.0-beta.8) (2022-07-15)


### Bug Fixes

* **utilities:** add css to files ([e87e053](https://github.com/adarshpastakia/axux/commit/e87e053224610ddb56e3ba27d996f8de593f390d))





# [2.0.0-beta.7](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.6...v2.0.0-beta.7) (2022-07-14)

**Note:** Version bump only for package axux





# [2.0.0-beta.6](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.5...v2.0.0-beta.6) (2022-07-14)


### Bug Fixes

* **DateUtils:** default isHijri to false ([f44199c](https://github.com/adarshpastakia/axux/commit/f44199c552bdc911e6d1e32c7af37f2bed066a90))
* **Popover:** pass innerRef to get anchor button ref ([6f5e31f](https://github.com/adarshpastakia/axux/commit/6f5e31fad09d154349644a1608ae0012df99094b))
* **RangePanel:** set selected end date to endOfDay ([a600de1](https://github.com/adarshpastakia/axux/commit/a600de1b2253db7acfa79c4e114c7fe2bee53d46))
* **TabPanel:** tab change events missing activeTab id ([66ee3e1](https://github.com/adarshpastakia/axux/commit/66ee3e13115cf83127155ce220946bc8df14b9c4))





# [2.0.0-beta.5](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.4...v2.0.0-beta.5) (2022-07-13)

**Note:** Version bump only for package axux





# [2.0.0-beta.4](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.3...v2.0.0-beta.4) (2022-07-13)

**Note:** Version bump only for package axux





# [2.0.0-beta.3](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.2...v2.0.0-beta.3) (2022-07-13)


### Bug Fixes

* **workflow:** syntax error (skip-ci) ([60a433e](https://github.com/adarshpastakia/axux/commit/60a433e20f22c6bd5e9d0d008f1fb89711ea7769))





# [2.0.0-beta.2](https://github.com/adarshpastakia/axux/compare/v2.0.0-beta.1...v2.0.0-beta.2) (2022-07-13)

**Note:** Version bump only for package axux





# Change Log

## 2.0.0

#### Initial Release

- 🏁 Customized tailwind config

> Core components for business applications
- Application viewport
- Page sections
    - Content
    - Header
    - Footer
    - Aside
- Panels
    - Simple panel
    - Panel stack
    - Panel group
    - Card
- Actions
    - Button
    - Menu
    - Tag
    - Breadcrumb
- Divider
- HotKey
- Typography
    - Middle ellipsis
    - Marked text
    - Abbr text
    - Badge
    - Icon
- Hooks
    - useDebounce
    - useIsDark
    - useIsRtl
    - useNotificationService
    - useOverlayService
    - useResizeObserver

> Data components for displaying various datasets
- Virtual lists
    - Simple list
    - Grid
    - Timeline
- Tree
- Datagrid
- JSON viewer
- Code editor (monaco-editor)
- Check list
- Histogram
- Pagination

> Date components with support for hijri calendars
- Date input
- Range input
- Superdate
    - Quick select presets
    - Relative date ranges
    - Absolute date ranges
    - Event calendar

> Form components
- Form with schema based validation
- Inputs
    - Text
    - Password
    - Textarea
    - Number
    - Checkbox
    - Radio
    - Switch
    - Slider
    - File

> Media wrappers
- Image viewer
    - Zoom and rotate
    - Display overlay images with swiper
    - Draw objects in canvas over images
- Video player
    - Scene list
    - Playback speed control
    - Draw objects in canvas over video
- Audio player (wavesurfer)
    - Audio waveform
    - Draw audio regions
    - Equalizers
