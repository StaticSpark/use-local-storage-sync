# useLocalStorageSync Hook (React)

#### To get started, simply run:

> npm install @cullenbond/use-local-storage-sync

#### Then import into your react component.

    import { useLocalStorageSync } from "@cullenbond/use-local-storage-sync";

#### Example 1:

    const [expand, setExpand] = useLocalStorageSync("showButtons", false);

#### Example 2:

    const [persistedCount, setPersistedCount] = useLocalStorageSync("counter", 0);

## Advanced Loading and State sync usage

An abstract example of load logic using initialization value, to avoid infinite load loops. If you persist and load data to data stores bi-directionally.

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

A simpler example

    const [defaultSearchTime, setDefaultSearchTime] = useLocalStorageSync("DefaultSearchTime", 60)
    setDefaultSearchTime(50)

## Parameters:

1. Value Key Name

Similar to how JS Map() works we will identify the name of our value that is to be stored.

> It is important to note that if you might to be persisting several variations a name, to make sure the name is unique.

Examples of this might include:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount")

    const [purchaseNowButtonClickCount, setPurchaseNowButtonClickCount] = useLocalStorageSync("purchaseNowButtonClickedCount")

    const [sellButtonClickCount, setSellButtonClickCount] = useLocalStorageSync("sellButtonClickCount")

2. Default Initial Value

The initial value takes precedence if no existing values have been stored so far.

In the case a value has been stored, the default value will be overridden by stored state.

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0)

    const [purchaseNowButtonClickCount, setPurchaseNowButtonClickCount] = useLocalStorageSync("purchaseNowButtonClickedCount", 0)

    const [sellButtonClickCount, setSellButtonClickCount] = useLocalStorageSync("sellButtonClickCount", 0)

3. (Optional) getItem function

Method called when retrieving a stored or synced value, before setting value to be used in state.

    value => JSON.parse(value)

These two examples are the same:

    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0)
    const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0, value => JSON.parse(value))

This is the default value

4. (Optional) setItem function

Method called when setting a stored or synced value, before setting value.
We need to save a string to localStorage.

    value => JSON.stringify(value)

If you are already passing a string type. Skip this method, or pass explicitly not to use JSON.stringify or items may be quoted twice.

    value => value

These two examples are the same:
const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0, null, null)
const [buttonClickCount, setButtonClickCount] = useLocalStorageSync("buttonClickCount", 0, value => JSON.parse(value), value => JSON.stringify(value))

### Avoid errors

Over using the useLocalStorageSync hook can cause potential performance issues.

Do not use useLocalStorageSync with the same key.

For example, if you have a post component that is re-used.

Do not use this hook to store the number of likes, or reactions, etc.

If you do, make sure each instance is using an identifiable unique key.

## Common Usecases

Storing a website setting, that is use to render a site at load.

- isMenuOpen
- numOfImagesToShow

Storing a value that might be persisted for a redux store to initialize on next load.

- todo list
- count
- userID

It is important to note if the window storage object update, all instances of the hook will look at the storage object. Then it will check for updates using the key. Overuse could cause a site to run slower.

## Anti-patterns:

It is not a good idea to use this to store data in re-used component, or a large list of components.

IE: Do NOT use for data within a feed, because each storage update will make a function call to all callers and this data does not need to be persisted. Also be careful if you use the same key name instead of a unique id this will be persisted across globally.

IE: Do not use to store data that does not need to be persisted.

You will want to clean up all this data, if generating unique keys.

This will create unnecessary memory issues persisting data eternally, for a post that you were scrolling past once.

If however you have a favorite list of homes, you could use this and store the data long term in a database and sync the data, but keep a persisted copy locally. When working with service workers or offline and miltiple tabs these becomes extremely useful.

## Return values

1. value
2. setValue
3. error
4. initialized
