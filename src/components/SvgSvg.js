export default {
  name: 'SvgSvg',
  props: {
    origin: {
      type: String,
      default: '',
    },
    transform: String,
    overflow: String,
    id: String,
    width: String,
    height: String,
    color: String,
  },
  methods: {
    formatOriginPartAt(index) {
      const part = this.origin.split(' ')[index] ?? ''
      const partWithoutKeyword = part.replace(/(top|left)/, '0%')
        .replace(/(bottom|right)/, '100%')
        .replace(/center/, '50%')
      return /^\d+%$/.test(partWithoutKeyword) ? partWithoutKeyword : undefined
    },
    isOriginPartValid(str) {
      return /^\d+%$/.test(str) && str !== '0%'
    },
  },
  computed: {
    originX() {
      return this.formatOriginPartAt(1) ?? '0%'
    },
    originY() {
      return this.formatOriginPartAt(0) ?? '0%'
    },
    originAlignX() {
      return this.formatOriginPartAt(3) ?? this.originX
    },
    originAlignY() {
      return this.formatOriginPartAt(2) ?? this.originY
    },
    shouldRenderSecondSvg() {
      return this.isOriginPartValid(this.originX) || this.isOriginPartValid(this.originY) || this.overflow
    },
    shouldRenderG() {
      return this.$slots.origin || this.transform
    },
  },
  mounted() {
    console.log(this.$slots)
  },
  render(createElement) {
    const childL2 = this.shouldRenderSecondSvg ? createElement('svg', {
      attrs: {
        x: `-${this.originX}`,
        y: `-${this.originY}`,
        ...this.$attrs,
      },
      style: {
        overflow: this.overflow,
      },
    }, this.$slots.default) : this.$slots.default
    const childL1 = this.shouldRenderG ? createElement('g', {
      attrs: {
        transform: this.transform,
      },
    }, [this.$slots.origin, childL2]) : childL2
    return createElement(
      'svg',
      {
        attrs: {
          x: this.isOriginPartValid(this.originAlignX) ? this.originAlignX : undefined,
          y: this.isOriginPartValid(this.originAlignY) ? this.originAlignY : undefined,
          id: this.id,
          width: this.width,
          height: this.height,
          color: this.color,
          ...(this.shouldRenderSecondSvg ? {} : this.$attrs),
        },
      },
      [childL1],
    )
  },
}