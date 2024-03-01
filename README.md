# useLocalStorageSync Hook (React)

#### To get started, simply run the following cmd to install the package:

    npm install @cullenbond/use-local-storage-sync

#### Then import into the hook into your react component.

    import { useLocalStorageSync } from "@cullenbond/use-local-storage-sync";

#### Example 1:

    const [showButtons, setShowButtons] = useLocalStorageSync("showButtons", false);

#### Example 2:

    const [persistedCount, setPersistedCount] = useLocalStorageSync("persistedCount", 0);

#### Example 3

    const [userId, setUserId] = useLocalStorageSync("userId", "bob");

#### Example 4

    const [groceryList, setGroceryList] = useLocalStorageSync("groceryList", ["Apples", "Oranges", "Bananas"]);

## Advanced Loading and State sync usage

> An abstract example of load logic using initialization value, to avoid infinite load loops. If you persist and load data to data stores bi-directionally.

    const [showMenu, setShowMenu, showMenuError, showMenuInitialized] = useLocalStorageSync("showSettingsMenu", true)

    useEffect(()=>{
        if(showMenuInitialized){
            // do things that might otherwise cause side effects
            // update redux store to localStorage value, after initialization
        }
    },[showMenu])

    useEffect(()=>{
        if(showMenuInitialized){
            // do things that might otherwise cause side effects
            // update localStorage value, after initialization and when state is updated
            setShowMenu(state.showMenu)
        }
    },[state.showMenu])

## Parameters:

1. Value Key Name

Similar to how JS Map() works we will identify the name of our value that is to be stored.

> It is important to note that if you might to be persisting several variations a name, to make sure the name is unique.

Example:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount")

2. Default Initial Value

The initial value takes precedence if no existing values have been stored locally.

Example:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0)

3. (Optional) getItem function

Method called when retrieving a stored value, before setting value to be used in state.

> The hook will json.parse() the stored value, by default

Example:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0, value => JSON.parse(value))

4. (Optional) setItem function

Method called when setting a stored or synced value before setting the value.

> The hook will json.stringify() the stored value, by default

Example:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0, value => JSON.parse(value), value => JSON.stringify(value))

## Avoid errors

- Overusing the hook with the same key can cause performance issues.
- Do not use with the same key in re-used components.
  - unless you intentionally want to reference and update the same value

## Common Usecases

- Storing website settings.
- Initializing Redux store on load.
- Persisting data for offline scenarios.
- Updating state across tabs and windows, in same browser

## Anti-patterns:

- Avoid using in a compononent that is re-used often, and key points to the same value.
- Do not persist data that doesn't need to be stored long-term.

## Return values

1. value
2. setValue
3. error
4. initialized
