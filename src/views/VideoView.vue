<template>
  <div class="wrapper">
    <div
      class="video_wrapper"
      :style="{
        transform: `translate(${video.translate}vw)`,
        transition: `transform ${video.transitionDuration}s cubic-bezier(.2,0,.16,.92)`
      }"
    >
      <article class="block block_question">
        <span v-for="word of question" class="text text_white block__text">{{ word }}</span>
      </article>
      <img :src="$route.params.photo" alt="" class="block block_img">
      <article class="block block_name">
        <span v-for="word of name" class="text text_black block__text">{{ word }}</span>
      </article>
      <article class="block block_heading">Verified</article>
    </div>

    <div class="menu_wrapper">
      <menu
        v-if="menu.showBefore"
        class="menu menu_before"
      >
        <m-button @click="play">ᐅ</m-button>
      </menu>

      <menu
        v-if="menu.showAfter"
        class="menu menu_after"
      >
        <m-button @click="repeat">Repeat</m-button>
        <m-button @click="edit">Edit</m-button>
        <m-button @click="create">Create</m-button>
      </menu>
    </div>
  </div>

  <audio @canplaythrough="audio.ready = true" id="player">
    <source src="../assets/music/genius_verified.mp3" type="audio/mp3">
  </audio>
</template>

<script>
//Test url: http://localhost:8080/video/%D0%96%D0%B0%D0%BA%20%D0%A4%D1%80%D0%B5%D1%81%D0%BA%D0%BE/%D0%90%20%D0%BA%D0%B0%D0%BA%3F/data:image%2Fjpeg;base64,%2F9j%2F4AAQSkZJRgABAQAAAQABAAD%2F2wCEAAoHCBUWFRgVFRUYGBgYGBgYGRgYGBgYGBgYGBgZGRgYGBgcIS4lHB4rHxgYJjgmKy8xNTU1GiQ7QDszPy40NTEBDAwMEA8QHhISHjQhISQ0NDQ0NDQ0NDQ0NDE0NDQ0NDQ0NDQ0NDE0NDQ0NDQxNDE0NDQ0MTQ0NDQ0NDQ0NDE0NP%2FAABEIALcBEwMBIgACEQEDEQH%2FxAAcAAABBQEBAQAAAAAAAAAAAAADAAECBAUGBwj%2FxAA6EAACAQIEAwYEBQIGAwEAAAABAgADEQQSITEFQWEGIlFxgZETobHBMkJS0fAUYgdygpLh8SMzohX%2FxAAZAQADAQEBAAAAAAAAAAAAAAAAAQIDBAX%2FxAAiEQACAgICAgMBAQAAAAAAAAAAAQIRITEDEkFRBBNhIjL%2F2gAMAwEAAhEDEQA%2FAPM7wiQAMsU1mDEWkWEyQANpIVJLAuI0d3lUPHBioAnxY%2FxZVqGJLwoAtUXgqdPWFAj5rQJDIgkHpiCNeOKl4UygDpBGGqtKzNKQDmIRgZbwGCeq2WmpY9PuY2FE8O9pc%2Fq7CdHw3sRdQazkeKpv%2FuP7TqcB2ZwyD%2F1A25vdj%2F8AWkxkoyOiPHJrJ5ViMQY9Oe0phaS7U0HhZV%2FaGFKk34kT1RfrBJEy+OzxbLG+HPYMRwHCOO9SQHxXuH5WnPcS7Fpr8F7f2vqP9w%2F5g0ZS4JI8+caTPq050PEuE1aJs6keBGqnyImJX0McWQk1hlB0kSYdxBMs1KBZoQPBMscQoksUn1E1UbSY+F%2FFNlV0mcxSGAjtpJWg6kzRAOMY7G0grS0jWCyEyRpK8UZ1UUKSSzlEjTGkizy2zmJOILnHLSMEAZIa8ro0mXiYE2jqIHPJZoICbNaAqPJEwdSNIAWaGpmCQQ6iDAkRK9SnLAE0OC8MavUVANBq5%2FSo%2Ffb1hdBFNuhdnuANXOYnKgIBP1A6z0nhfCUpKERcqjnzPUneFwGBRECqAFXYTQQA9ZlKTZ38XEkv0lTW3SEqE72kVW2o9oU+8zN6K5OliZJU6%2FYyfw4%2Fwuf%2FAB%2F3EOwD785Km7bE6Wk7fy0WTnpbSNWJ0VcSgYFWUMp5GxBnn%2Fans0UvUo3yfmXmvX%2FL9J6QwuNpRrLvzGx%2FnrKUmjHk44yR4gbg6wqidP2q4LlfOgGU8gNpgJQI05zXsqPPlFxdMrGlIfCl56Z8IMwUiQOFTvTVQylhxLyC8ibtkseV6zy1WOUTNdtYoqxIJeJFgjUhKT3M0rBvBUEyxQsURsCZRBGneW3SSSnKs56KPwohSlx0tBMY7ArFLSN4R3kIANeOI4STywAG0E5k2MgReCAghllGlYCTR4NAauF4cz%2Fh+QJ+k7%2Fs%2FwAO+DTCnVibsfoJQ7MYHLRzt+LyuRpp5eWk3MN4+P8A1M5M6eGHk0kAtt5wyj0gUN9ZNqgmbOxB1EMqzP8AjGEp19PtFYNMuZRyjtYDWVVrW52knxAgFMidTHAA8jA5wdbiPn%2Fe%2FhFYMk7XlKqfaFLG37H7SpnJY31HhHZMlgocSohhlPp58px2Jw6o5%2FnpO8rlfzG97%2Fb%2FAJnK9oKWZcw63PTwAlpWcnPG1ZiPikOkzsSnMQWTWWEFxaVVHJYPCiX0W2shQoWkcVWAFpDdsl5K+Jr3MqM0i73jIZrFUXGJK8LRMEVk6S6y5aNY7L2aKRvFMzUtVN4RSJVxD2ManVjSwYk65lRjDVWvAAykSyKpCokSwoibAhaQYR3MJTS8Qyn8Mx%2FhzQZAJXqWjsmymyxlSHJEVHLmGYEi+wNr+saYz0rhthhkK5bWFgu3vzPiby18TuacrfOA+JaiiZQvdHd8NNosLWGlwSSLAD9phJ5O7hWC1RquP5yllKnifMeEFQDm4y26nYeXiZcHD1tqzE89bfKQdKZJQCNIwQ2gFVlOVcoHiSSfpDJTW%2FecnoO6P3gMkad9xf3v7iD%2FAKQ%2FlY+T6%2FOWQKP6yv8AqJ+ukbOttKobzt9iIE5B5HUa29DBPiARYbjcSNd25E+ozD9x5yniQQM34X5EaqekVhRYDmAepZhz1H1gaOKQi7Nla9rSNWx5gnp9YxS0WMS6lstv+yJz%2FG6V0axsB9JqhDYkknwPTpKmPcfBckcvK+m3SXHZz8q%2FlnC5RC0V1g9zCppLZ5wbF1sq6TFeoTL+LfSZWaEYlId3gxVkarQIeaxQ0aFN7yykz6Day8hikaxyHzRQV48ksniDeNSiqGOhhZgEdYMLCs0heFgOqxMdIxeCZ46sCRMIrWgVMJEAqleVXqEwji8ilOVhARF49OmSy+Y6Dfxh0SGSgxGYKSBzANveT2A7%2FF3yJ5AE8thoIPCo24vfpzA+keuf%2FChH6AR6gfuJcwigoADawAJ685jI7+LQNcU17M4QdO837TVwpRhozsfG8xcUtBdHe56aaynQ4oisoRmU67tmBHWTRvZ07quawLggX1I19SJBq66FF0vYk6knwBO8qYLGCq72bZU57HvafzxmXiOItTGR7qQSUN9De9rHxsdoivB0LY1x+FCeVrAe95JKbv8AjVF%2F0g285wOL7SuRa%2FeGhtsevnK47Q1iLF8o8wD8zKUWQ5RPSlwiLqpP+lrD0GogXGYEG3nt7jxnn+C4jUzWSt%2FpzDXynQUMY5Iz%2FwDfmIONCUrRpvhFJ1AN9%2FL+WlZqBVu7fXfr+00qT3AsNx%2FNfaQNLN6%2FU8oqC8FZU52tewHMaWsNPSRx%2FCC1FkzrmbZCD6A+HLlDEinZm1AIuN%2FzeHMW1nPY%2FjDqSq%2Fiubk6630vLbrRHVTw9FJezRH469JH%2FQST6E8pmY3BvSbK46gg3Vh4qecHiqb3zNcltbnxhsPiC9NkcklO+hPIbMPL9oWzLl+LHq3HaMvE7TLYzVxR0mYFm0ThRXqGCAll6cGiTVFFnCoSZfK2Er4cQ9R9JnLZadIHmigs8UKF2LLSN5JjIgxUSyasZK8GTaDapCgDxvhwaPDho9FLQgsiTHd4AtCiGTB1lhFEroIUm0iQh3Np1GB4+FtTZQEAAUjSwtznHu8so+ZQfDun02PtE44On4zXZr2d3QqipSa3IkD%2FAC6Eff2mNxTFvSNgTbW1jrr0mh2YsKLdSuvoZU4hg89TUWUbtpoDFfs6KpujlsfjHYnUmw1AtYePmZUSu++um2k7gcKVV1ZLdbQNThoe1k0%2FUdAfSUpqqoX1u7stdgkd1chsuV9WIuWuo0Ht85tdqcMWTIdRuWIF9OQhuy2D+GhH6mzfK32l3iaZjMZbs6Ip1R5l%2FwDitYk+0kvBVKm5IHjbbynatgUy63Ftj%2FOUi2FddQFZfG1z7Su78E9FpnIUeAU7AKzs%2FI6BR8vvOgwFGoEyVVd8uzciPPlNvCp+pPbQTQuNrFR6W9YpSvYKNawZ+BckXLX8ANgBsLneaKsPL9vGV3QX29YHFPl1+Uiy6WiPGKd6bld7Hrsb7TlXKMMzEBtD1a+h9pv0cQC9jtMbtHw4IVqJexuGA%2FL18tY7sUVRVqoHBHgJkYYBS5I%2FKR6mbHCAO%2Ffa2%2FXwmZxZ1DFF5HvHxPhHHOCeeajBmXiBpM++svVzpMtm1nRHR5KCuZFVgw8LTOsuii3RWNWhKRgKx1k+S2sAbxRWijJouOsgBLhSRNOTYiqwg2py3kjZY7FZXRIQmGVI7pCwsqOYywjrIKIxh1aQd5G0E5k0STkqblTcf9watEWgNOso7PgeK1Rfysua3UaH5TpcLluQB7gnf6nacP2ZxALZSL5RceXOdtwwgd4neYSVOj0uOSkky4%2FDkOpVf9oEBURc6p4k2HkDrG4hxZUUm4vM%2FheJXu13a7Pmt%2Fat7e5tEjZrB0+FUg6DSWcSml5jjjCct%2FeO%2FGU2JjdBTRPE1LC5W687byWGH5kOZfAysnGKJuMw+WsxcTimoOHS+Rjr4C%2F0vJopNHYIR4WMqYuuQSIHAcWSoB4+cliVzfWDeAqgfxbDXQfz5TNx2I0t6+UJUrZbi9%2FETMrkknXSSlZLZGnU715eRGqd3nyvsToD56TNVSdF1NtJrYKswC2U5xpqbqt98o5SngRRx6LQRgN11Y8sx0VR6%2FScWxubnc6zp+1jZWFO9ye+%2Fnc5b+k5grNIrB53yp9pV6AYltJlsJcxTyizTeKwYoixhKEHa80sNh9JTdDirZKkdIOtDuloGqZC2avRXvFIWil0RZvxZYNHhUMxMwbJBFZaaBYRJhYlEdiI14NmjECqCRVYQiStHYwTyq0sVDAykBC8gzQhEGwjA1ez2NFOpc7MMh6XI1naDEZBa%2FOec0zadVQxWemG52sfMaH7TLlj5Ov406wLFu1VwgNr7m+wh62HdECodund678r3jYGqlMB3BN7m1vNdx6+01RxFGGYD8unTf8A4krBvKbbMOriXUd8MD0uR6eEDUepVARbqDvfQkeAmy+KQovd1vr7k6%2FzaWMPXokKGuCNjbY2G%2Fjpf2j1km5PDMTh%2FAxe7XWx2ta9t51tJcyFGFwRbla2gEqtjKRRbmxUkc7aE87cxDLxOnzbbobHbXT+amTJtstOkYNem+HfuklDtbXL0Pj5zXwvFMy+PlaQfFUXPcdSx5W5A9edpmphXpvnFsjNtrZSbkDoDr7RSinkuM28Gi1fMx8GFxzsRoftEi6QTk32tqfmAfrDodJMVkpvAThlRRVyncrfXzmjiay0gWa1hrOYo3eqCpOrAD3tNjttwplppUQsUU2cE3sTs329pr9Tlb8I5586iv05HH4o1HZzux+XKUa7WEJKmKeUo5PObt2Z9drmV2h3EZqDeE3QwVPebmFItM3DYa51mzhsMJEmbQK+ITWU602HoCZ1fD6yYspmfGlz+lPjFNLRnTLAaER5XBjhpiZlvPIlpXDwiNFQibmBcwrGV3jAIpjsYJDJMYwBvIESZEiZQyBkCISMRGAIzU7PYnv%2FAA+T7eGYa%2FQfKZjiLDVCjq43Ug+xjatUVGXWSZ3%2FABbC5aIVV8Lk9AdB%2FPGZ2GwRVR3iBbW+onRq3xUBH4WVQCdSNOfvM4DKStjblcHUTF2jui0yg+Fc6qUcdG19iI4w1Y%2FkZfHVQJscNQs5yILjc7WGnjNC7DdLjU2tF2Xo0TWjn0wulmZb+Cks3sBaHo8JDfiLW%2FTexPnNR69rlUsOYI26gyLYoAHOR09ZDl6LpFF+FopBRQCCNraXm2+HBTKBva3LYc%2F%2FAKlDCEO4Nh5jYcrN5%2FeabqAMqjS2U66gc%2FLWNW9kNpMxHT6%2FSRxBH4Bud%2FKW8XlVMwIO1tOe1tR0vKaps299z941GguyxwPBg1VA5HN6Cd1Uw6ujI4urqVI6ETE7LYTutUI%2FEbL%2FAJRz9TedEqzv4YVHPk87mkpSdHi3FcC1F3puNVJHmORHmJhV9TPcO0HZhMWAWYo6iwcWII5BhzE4DifYHFUzdVFVPFDrbqp19ryHxNOzFM5bA4S5ufSGx6Kotzmg9E09GUqRyIIPsZmYpCZlmy7KmGYXl%2F8AqVEpJShHpxMpSoK2LHjAmuJXdJXZY0kPszT+MIpk6xQoOxoqJBjJqZCpISJoiryxTMoXlyi0poTQZoNhCEwZMkQO0cGRYxXlUMkZAiPeOBGkBELEUhlSX8BwavW%2F9VJ362sv+46RpMVmKySOSei8P%2Fw3qtY1qioP0r3m99p1PD+xeDpWPw87Dm%2Fe+W02jxsVnJ9hazvT+GUNgSQ5B1BtpmtbTz5TouJcHVgNLG1h0%2FedHWZUQhQFAGwFhM3OG717ixI6GRywo34pmNgKDUwdL3PL+ayGIxTDusQCRrYfh8bdALfOXP6uzMAO8QTmsOQO3jYSk7nOA1rC4B6G+53G5nM9HUnbsrrXbU2Yi%2FqeYPtBrhc5BBsOa2tz01lz+rzEqdsoCjbWwOhvuLjXzlrC2c3GzaHlrqN%2FWZ9TXtSB06Vtt1uFIGqkj5i0ttTBUnQMy77XOxNvG0tijYa26%2F5QBz8tPSYXEeIgDIljcnW82ikkc8m5OkZ%2FFH7+TQqu9uZIGsr4fPnWmuuchR0HM+gklWwuf5ebHZXBZqnxWHRL+HM+v2lcce0iuSXSH6dpg6ARFUaBQAPSFVZO2kIizvo81sQEmDBn7wgMdAAxeApVRaoiOP7gD85zPEf8P8M+qF6Z6HMvs37zrog0lwTGeR8T7A4mncoFqqP0Gzf7T9iZy2JoOjFXVlI3DAqfYz6HvKmO4bSrLlq00cf3AEjyO4mUuFPQ7Pnd1gHSeq8b%2FwANlN2wz5T+hzcf6X3HrecFxTg1ag2WsjIeRP4W%2FwArDQzGUHHYJmDlil74EUmx2CvIsY14oFkQsMmkHeN8SBIdnkQ0DnhEMVAM5jCO4iQSkgHUTc4B2fr4prU07o%2FE50RfXmeglnsl2abFPdrrTT8beP8AYvWew4XCpTQIihEUWCrpNoQvLJbOf4L2Lw2HAZwKr+LfhB%2FtWdGtRQLKLDkALCDcyKCdCilokm1XpBCoTGAk1WMDJ4%2FiMlMjmdPWcvg+I%2FBbK5uhHsf5rNvj4LuACLL9f59JyONUa3IuJE4pqmXF0zpnqI9ipDW5gj2MzsYwLseWpBtfpOHrcQqUnBRiNdRfQgcjNfDdoCbBkGpvof3nFOFM64SbNqkhZwQx7psTzOl%2FXebOGVUGtxf8vMEkEfT5mcZV7QFDYJ1+vTWBq8aqVBuBYchbrMlHyaZeDpeOdoCqlaZ1K7jUeAAtMXAVsy5upv5zOVrrmBNr2YcwTzlrAJkzHlvbp4ynlDiurNWinxHCKdL6+U73gmHC6AaDQek5bszhjbOR3m7wvuBso+d53XD6dgBOzhh1icfPPtIsOIUDSRA1h7TUwK7r5RCTcb7feDEbAIjg+fhJEwLi8QXr94wDRwYH4ttx7a%2F8ySVAefpz9oqAKIDGYVKiFKiK6ncMLiGzRRUBx1X%2FAA8wpJIaqo5KH0HQXjzsIpH1x9AfNXwTE1IxRThtmwJ0MHlMUUpEhAkIixooxsmyS9wLhTYmulFSBmOpPIDUxRS4bJZ7dwzhqYamtJBoo35k8yestEx4p1ogC0VtIopSAVJL6mch2r4zVWp8Ok2QLuRudIoo0BW4C71UfO5LK1rnXQrcfeZ1fBAXN7621iikSKRyvGsPZlPWPRp7GPFOXl2dfFoVbC5ySOUClIroYopib1ksYB7PbkwIIm1w7C5mCXNr3Pl4RRRr%2FSIk%2FwCWeh8OwwGXb29vb7zcw62EUU7%2FAAeeHSTJiigIi+3jKyaxRQAIxgi0UUBi1kyBziigAE1CD3Tp4H7HcQ9KrcaevQ+EUUoQXNGiiiA%2F%2F9k=

export default {
  name: "VideoView",
  data() {
    return {
      menu: {
        showBefore: true,
        showAfter: false,
      },
      video: {
        translate: -105, //-105vw,
        transitionDuration: 0.8,
      },
      audio: {
        ready: false
      }
    }
  },
  methods: {
    play() {
      this.video.translate = -105

      const audio = document.querySelector('#player')
      audio.play().then(() => {
        setTimeout(() => {
          this.menu.showBefore = false
          this.menu.showAfter = true
        }, 2000)

        setTimeout(() => {
          this.video.translate = 0
        }, 1000)
        setTimeout(() => {
          this.video.translate = 105
        }, 2300)
        setTimeout(() => {
          this.video.transitionDuration = 0.8
          this.video.translate = 160
        }, 4800)
        setTimeout(() => {
          this.video.transitionDuration = 0.3
          this.video.translate = 265
        }, 7250)
      })
    },
    repeat() {
      window.location.reload()
    },
    edit() {

    },
    create() {

    },
  },
  computed: {
    name() {
      return this.$route.params.name.split(' ')
    },
    question() {
      return this.$route.params.question.split(' ')
    }
  }
}
</script>

<style scoped>
/*TODO: adaptive for mobile*/

.wrapper {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  overflow: hidden;
  background-color: var(--lemon);
}
.video_wrapper {
  z-index: 10;
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  grid-template-columns: 50vw 60vw 55vw 100vw;
}

.block {
  position: relative;
  height: 100vh;
  font-size: 4rem;
  font-weight: 600;
  line-height: .80em;
  text-transform: uppercase;
}
.block_heading {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 7rem;
  background-color: var(--white);
  --border-color: var(--white);
}
.block_name,
.block_question {
  padding: 1em;
}
.block_name {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  background-color: var(--dark);
  --border-color: var(--dark);
}
.block_question {
  display: flex;
  flex-flow: column wrap;
  justify-content: center;
  align-items: flex-end;
  background-color: var(--white);
  --border-color: var(--white);
}
.block_heading::before,
.block_heading::after,
.block_name::before {
  content: '';
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  left: calc(-4vw + 1px);
  border-top: 4vw solid transparent;
  border-bottom: 4vw solid transparent;
  border-right: 4vw solid var(--border-color);
}
.block_heading::after {
  left: initial;
  right: calc(-4vw + 1px);
  border-left: 4vw solid var(--border-color);
  border-right: none;
}
.block_question::before,
.block_question::after {
  z-index: 30;
  content: '';
  position: absolute;
  right: calc(-4vw + 1px);
  height: 50%;
  border-left: 4vw solid var(--white);
}
.block_question::before {
  bottom: 0;
  border-top: 4vw solid transparent;
  border-bottom: 4vw solid var(--white);
}
.block_question::after {
  top: 0;
  border-bottom: 4vw solid transparent;
  border-top: 4vw solid var(--white);
}

.block_img {
  width: 60vw;
  object-fit: cover;
}

.block__text {
  display: block;
  width: min-content;
  padding: .19em;
  margin-bottom: .1em;
}
.block__text:last-child {
  margin-bottom: 0;
}

.text_white {
  color: var(--white);
  background-color: var(--dark);
}
.text_black {
  color: var(--dark);
  background-color: var(--white);
}

.menu_wrapper {
  display: flex;
  justify-content: center;
}
.menu {
  display: grid;
  grid-gap: 1em;
}
</style>
