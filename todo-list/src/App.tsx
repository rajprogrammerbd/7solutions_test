import { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { IItem } from "../types";
import { addItemFromAllItems, removeItems } from "../store/features/itemsSlice";

function App() {
  const timeouts = useRef<Map<string, NodeJS.Timeout>>(new Map());
  const { allItems, Fruit, Vegetable } = useSelector((state: RootState) => state.items);

  const dispatch = useDispatch();
  
  const timedItemRemoved = (item: IItem): void => {
    const timeout = setTimeout(() => {
      dispatch(removeItems(item));
      timeouts.current.delete(item.name);
    }, 5000);

    timeouts.current.set(item.name, timeout);
  };

  const handleAddItem = (item: IItem): void => {
    dispatch(addItemFromAllItems(item));
    timedItemRemoved(item);
  };

  const handleRemoveItem = (item: IItem): void => {
    const timeout = timeouts.current.get(item.name);
    if (timeout) {
      clearTimeout(timeout);
      timeouts.current.delete(item.name);
    }

    dispatch(removeItems(item));
  };

  useEffect(() => {
    return () => {
      timeouts.current.forEach((timeout) => clearTimeout(timeout));
      
      // eslint-disable-next-line react-hooks/exhaustive-deps
      timeouts.current.clear();
    };
  }, []);

  return (
    <div className="w-full h-auto flex items-center justify-center">
      <div className="sm:w-[90%] xl:w-[80%] h-full w-full mt-5 2xl:max-w-[1400px] grid grid-cols-3 grid-rows-[600px] gap-10">
        <div className="flex flex-col gap-5">
          {allItems.map((item) => (
            <div
              key={item.name}
              onClick={() => handleAddItem(item)}
              className="w-full h-10 border-1 border-gray-200 scale-[1] hover:scale-[1.02] rounded-md border-solid flex items-center justify-center text-xl cursor-pointer shadow-sm hover:bg-gray-700 hover:text-white transition-all duration-300"
            >
              {item.name}
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-center px-2 py-3 bg-black text-white mb-3">Fruit</div>

          {Fruit.map((item) => (
            <div
              key={item.name}
              onClick={() => handleRemoveItem(item)}
              className="w-[80%] h-10 border-1 border-gray-200 rounded-md border-solid flex items-center justify-center text-xl cursor-pointer shadow-sm mb-5 last:mb-0"
            >
              {item.name}
            </div>
          ))}
        </div>
        
        <div className="bg-white rounded-lg overflow-hidden flex flex-col items-center">
          <div className="w-full flex items-center justify-center px-2 py-3 bg-black text-white mb-3">Vegetable</div>

          {Vegetable.map((item) => (
            <div
              key={item.name}
              onClick={() => handleRemoveItem(item)}
              className="w-[80%] h-10 border-1 border-gray-200 rounded-md border-solid flex items-center justify-center text-xl cursor-pointer shadow-sm mb-5 last:mb-0"
            >
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
