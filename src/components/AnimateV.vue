<template>
  <component :is="attributeName === 'transform' ? 'animateTransform' : 'animate'"
             v-bind="{id, attributeName, type, from, to, values, begin, dur, keyTimes, keySplines, fill, calcMode}"
             v-on="$listeners"></component>
</template>

<script>
  const SplineMap = new Map([
    ['ease', '.25,.1,.25,1'],
    ['ease-in', '.42,0,1,1'],
    ['ease-out', '0,0,.58,1'],
    ['ease-reverse', '.75,0,.75,.9'],
    ['linear', '0,0,1,1'],
  ])

  export default {
    name: 'AnimateV',
    props: {
      id: String,
      attributeName: {
        type: String,
        required: true,
      },
      type: String,
      from: String,
      to: String,
      values: String,
      begin: {
        type: String,
        required: true,
      },
      dur: {
        type: String,
        required: true,
      },
      easing: {
        type: String,
        default: 'ease',
        validator: value => [...SplineMap.keys()].indexOf(value) !== -1,
      },
    },
    computed: {
      keySplines() {
        const length = this.values?.split(';')?.length ?? 2

        return new Array(length - 1).fill(SplineMap.get(this.easing)).join(';')
      },
      keyTimes() {
        // TODO: Support values
        return '0;1'
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
