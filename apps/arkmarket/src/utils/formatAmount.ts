type NumberFormatOptions = Intl.NumberFormatOptions;

interface FormatterRule {
  upperBound?: number;
  exact?: number;
  formatterOptions: NumberFormatOptions;
  hardCodedInput?: HardCodedInputFormat;
}

interface HardCodedInputFormat {
  input?: number;
  prefix?: string;
  hardcodedOutput?: string;
}

const formatterRules: FormatterRule[] = [
  {
    exact: 0,
    hardCodedInput: { hardcodedOutput: "-" },
    formatterOptions: {
      notation: "standard",
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    },
  },
  {
    upperBound: 0.0001,
    hardCodedInput: { input: 0.0001, prefix: "<" },
    formatterOptions: {
      notation: "standard",
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    },
  },
  {
    upperBound: 1.0,
    formatterOptions: {
      notation: "standard",
      maximumFractionDigits: 4,
      minimumFractionDigits: 4,
    },
  },
  {
    upperBound: 1000,
    formatterOptions: {
      notation: "standard",
      maximumFractionDigits: 4,
      minimumFractionDigits: 0,
    },
  },
  {
    upperBound: 1e15,
    formatterOptions: {
      notation: "compact",
      maximumFractionDigits: 4,
      minimumFractionDigits: 0,
      useGrouping: false,
    },
  },
  {
    upperBound: Infinity,
    // hardCodedInput: { input: 999_000_000_000_000, prefix: ">" },
    formatterOptions: {
      notation: "scientific",
      maximumFractionDigits: 2,
      minimumFractionDigits: 0,
      useGrouping: false,
    },
  },
];

const getFormatterRule = (input: number): FormatterRule => {
  for (const rule of formatterRules) {
    if (
      (rule.exact !== undefined && input === rule.exact) ||
      (rule.upperBound !== undefined && input < rule.upperBound)
    ) {
      return rule;
    }
  }
  throw new Error(`Formatter not configured correctly for value ${input}`);
};

export default function formatAmount(
  amountStr: string | null | undefined,
): string {
  if (amountStr === null || amountStr === undefined) {
    return "-";
  }

  const amount = parseFloat(amountStr);

  if (isNaN(amount)) {
    return "-";
  }

  const { hardCodedInput, formatterOptions } = getFormatterRule(amount);

  if (!hardCodedInput) {
    return new Intl.NumberFormat(undefined, formatterOptions).format(amount);
  }

  if (hardCodedInput.hardcodedOutput) {
    return hardCodedInput.hardcodedOutput;
  }

  const { input: hardCodedInputValue, prefix } = hardCodedInput;

  return (
    (prefix ?? "") +
    new Intl.NumberFormat(undefined, formatterOptions).format(
      hardCodedInputValue ?? 0,
    )
  );
}
