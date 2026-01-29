# Redux Store Setup

This directory contains the Redux store configuration for the application.

## Trade Dialog

The trade dialog is now managed globally through Redux. You can open it from anywhere in the application.

### Usage

```typescript
import { useAppDispatch } from "@/lib/store/hooks";
import { openTradeDialog } from "@/lib/store/slices/tradeDialogSlice";
import type { ExtendedAthleteData } from "@/lib/data/athletes-bank";

function MyComponent() {
  const dispatch = useAppDispatch();
  
  const handleTradeClick = (athlete: ExtendedAthleteData, type: "long" | "short") => {
    dispatch(openTradeDialog({ tradeType: type, athlete }));
  };
  
  // Or without athlete data
  dispatch(openTradeDialog({ tradeType: "long" }));
}
```

### Actions

- `openTradeDialog({ tradeType: "long" | "short", athlete?: ExtendedAthleteData })` - Opens the trade dialog with the specified trade type and optional athlete data
- `closeTradeDialog()` - Closes the trade dialog (automatically called when dialog closes)

The global trade dialog component is automatically rendered in the layout, so you don't need to add Dialog components in individual components anymore.

