<template>
  <component :is="attributeName === 'transform' ? 'animateTransform' : 'animate'"
             v-bind="{id, attributeName, type, from, to, values, begin, dur, keyTimes, keySplines, fill, calcMode}"></component>
</template>

<script>
  const SplineMap = new Map([
    ['ease', '.25,.1,.25,1'],
    ['ease-in', '.42,0,1,1'],
    ['ease-out', '0,0,.58,1'],
    ['ease-reverse', '.75,0,.75,.9'],
  ])

  export default {
    name: 'AnimateV',
    props: {
      id: String,
      attributeName: String,
      type: String,
      from: String,
      to: String,
      values: String,
      begin: String,
      dur: String,
      easing: {
        type: String,
        default: 'ease',
        validator: value => [...SplineMap.keys()].indexOf(value) !== -1,
      },
    },
    computed: {
      keyTimes() {
        // TODO: Support values
        return '0;1'
      },
      keySplines() {
        const length = this.values?.split(';')?.length ?? 1

        return new Array(length).fill(SplineMap.get(this.easing)).join(';')
      },
      fill() {
        return 'freeze'
      },
      calcMode() {
        return 'spline'
      },
    },
  }
</script>
