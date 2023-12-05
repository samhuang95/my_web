import { ref, onMounted, onUnmounted } from 'vue';

export function useTeleportLoaded(selector: string) {
  const element = ref<HTMLElement>();
  let observer: any;

  const checkElement = () => {
    const _element = document.querySelector(selector) as HTMLElement;
    if (_element) {
      element.value = _element;
      if (observer) {
        observer.disconnect();
      }
    }
  };

  onMounted(() => {
    checkElement(); // Initial check

    // Use MutationObserver to watch for changes in the DOM
    observer = new MutationObserver(checkElement);
    observer.observe(document.body, { childList: true, subtree: true });
  });

  onUnmounted(() => {
    if (observer) {
      observer.disconnect();
    }
  });

  return {
    element,
  };
}
