/**
 * Shared state for the phone header that hides while scrolling down and returns on scroll up.
 * The Case Study chapter bar reads it so it can sit directly under the header when it's showing.
 */
export function useHeadroom() {
  return {
    hidden: useState('headroom-hidden', () => false),
    height: useState('headroom-height', () => 0),
  }
}
