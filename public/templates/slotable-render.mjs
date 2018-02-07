import hyperHTML from '/hyperhtml/index.js'

export default function slotableRender (rootEl) {
  let slot = {}
  const render = hyperHTML(rootEl)
  const renderWithSlot = function (...outerArgs) {
    return function (...innerArgs) {
      slot.any = hyperHTML.wire()(...innerArgs)
      render(...outerArgs)
      return slot
    }
  }

  renderWithSlot.slot = slot

  return renderWithSlot
}
