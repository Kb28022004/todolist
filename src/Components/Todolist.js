import React, { useState, useEffect } from "react";

const getLocalData = () => {
  const lists = localStorage.getItem("myItems");

  if (lists) {
    return JSON.parse(lists);
  } else {
    return [];
  }
};

const Todolist = () => {
  const [text, settext] = useState("");
  const [storeData, setstoreData] = useState(getLocalData);
  const [isEditItem, setisEditItem] = useState("");
  const [toggleButton, settoggleButton] = useState(false);

  //store data in a hook
  const handleStoreData = () => {
    if (!text) {
      alert("Please fill something ");
    } else if (text && toggleButton) {
      setstoreData(
        storeData.map((elem) => {
          if (elem.id === isEditItem) {
            return { ...elem, name: text };
          }
          return elem;
        })
      );
      settext("");
      setisEditItem(null);
      settoggleButton(false);
    } else {
      const myNewItems = {
        id: new Date().getTime().toString(),
        name: text,
      };
      setstoreData([...storeData, myNewItems]);
      settext("");
    }
  };

  //delete single items
  const deleteItems = (index) => {
    const updateItems = storeData.filter((elem) => {
      return elem.id !== index;
    });
    setstoreData(updateItems);
  };

  //edit item
  const editItem = (index) => {
    const item_to_edited = storeData.find((elem) => {
      return elem.id === index;
    });
    settext(item_to_edited.name);
    setisEditItem(index);
    settoggleButton(true);
  };

  //remove all items
  const removeAll = () => [setstoreData([])];
  const OnChange = (e) => {
    settext(e.target.value);
  };

  //store items in localstorage
  useEffect(() => {
    localStorage.setItem("myItems", JSON.stringify(storeData));
  }, [storeData]);

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src="" alt="" />
            <figcaption>Add Your List Here</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              value={text}
              onChange={OnChange}
              placeholder="✍ Add Items"
              className="form-control"
            />
            {toggleButton ? (
              <i className="far fa-edit add-btn" onClick={handleStoreData}></i>
            ) : (
              <i className="fa fa-plus add-btn" onClick={handleStoreData}></i>
            )}
          </div>
          {/* SHOWITEMS */}
          <div className="showItems">
            {storeData.map((elem) => {
              return (
                <div className="eachItem" key={elem.id}>
                  <h3>{elem.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn"
                      onClick={() => editItem(elem.id)}
                    ></i>
                    <i
                      className="far fa-trash-alt add-btn"
                      onClick={() => deleteItems(elem.id)}
                    ></i>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="REMOVE ALL "
              onClick={removeAll}
            >
              <span>CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;
