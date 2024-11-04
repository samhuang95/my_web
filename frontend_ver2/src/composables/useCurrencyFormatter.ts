import { computed, isRef, Ref } from 'vue';

interface CurrencyFormatterOptions {
  locale?: string;
  currency?: string;
}

export function useCurrencyFormatter(
  num: number | null | Ref<number | null>,
  options: CurrencyFormatterOptions = {}
) {
  const { locale = 'en-US', currency = 'USD' } = options;

  const formatter = new Intl.NumberFormat(locale, {
    currency,
  });

  const formattedCurrency = computed(() => {
    // Extract value, handling both ref and direct values
    const value = isRef(num) ? num.value : num;
    return value !== null ? formatter.format(value) : '';
  });

  return { formattedCurrency };
}
