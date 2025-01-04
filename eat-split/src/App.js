import { use, useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [addFriend, setAddFriend] = useState(false);
  const [friends, setFriend] = useState(initialFriends);
  const [selectedFriend, setSelectedFriend] = useState(null);

  const handleButtonToggle = () => {
    setAddFriend((previousState) => !previousState);
  };

  const handleAddFriend = (friend) => {
    setFriend((previousFriends) => [...previousFriends, friend]);
  };

  const onSelectFriend = (friend) => {
    // setSelectedFriend(friend);
    setSelectedFriend((selected) =>
      selected?.id === friend.id ? null : friend
    );
    setAddFriend(false);
  };

  const splitBill = (value) => {
    setFriend((friends) =>
      friends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: friend.balance + value }
          : friend
      )
    );

    setSelectedFriend(null);
  };

  return (
    <div className="app">
      <div className="sidebar">
        <FriendList
          list={friends}
          selectedFriend={selectedFriend}
          onFriendSelect={onSelectFriend}
        />
        {addFriend && <FormAddFriend addFriend={handleAddFriend} />}
        <Button onClick={handleButtonToggle}>
          {addFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          splitBill={splitBill}
          key={selectedFriend.id}
        />

)}
    </div>
  );
}
function FriendList({ list, selectedFriend, onFriendSelect }) {
  const friends = list;

  return (
    <ul>
      {friends.map((friend) => {
        return (
          <Friend
            friend={friend}
            selectedFriend={selectedFriend}
            key={friend.id}
            onFriendSelect={onFriendSelect}
          />
        );
      })}
    </ul>
  );
}

function Friend({ friend, selectedFriend, onFriendSelect }) {
  const isSelected = selectedFriend?.id === friend.id;
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You Owe {friend.name} ${Math.abs(friend.balance)}
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} Owes You ${friend.balance}
        </p>
      )}
      {friend.balance === 0 && <p>You and {friend.name} are even</p>}

      <Button
        onClick={() => {
          onFriendSelect(friend);
        }}
      >
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function Button({ onClick, children }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FormAddFriend({ addFriend }) {
  const [image, setImage] = useState("");
  const [name, setName] = useState("");

  function handleSubmission(event) {
    event.preventDefault();
    if (!image || !name) return;

    const newFriend = {
      id: crypto.randomUUID(),
      name,
      image,
      balance: 0,
    };

    addFriend(newFriend);
    setName("");
    setImage("");
  }

  return (
    <form className="form-add-friend">
      <label>👬 Friend Name</label>
      <input
        type="text"
        value={name}
        onChange={(event) => setName(event.target.value)}
      />
      <label>📸 Image Url</label>
      <input
        type="text"
        value={image}
        onChange={(event) => setImage(event.target.value)}
      />
      <Button onClick={handleSubmission}>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, splitBill }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState("");
  const [whoIsPaying, setWhoIsPaying] = useState("user");
  const paidByFriend = bill ? bill - expense : "";

  function onSubmit(event) {
    event.preventDefault();

    if (!bill || !expense) return;

    const amount = whoIsPaying === "user" ? paidByFriend : -paidByFriend;

    splitBill(amount);
  }

  return (
    <form className="form-split-bill">
      <h2>Split Bill with {selectedFriend.name}</h2>
      <label>💰 Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />
      <label>🧍 Your Expense</label>
      <input
        type="text"
        value={expense}
        onChange={(e) =>
          setExpense(
            Number(e.target.value) > bill ? expense : Number(e.target.value)
          )
        }
      />
      <label>🧍 {selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={paidByFriend} />

      <label>💵 Who's paying the bill</label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value={"user"}>You</option>
        <option value={"friend"}>{selectedFriend.name}</option>
      </select>

      <Button onClick={onSubmit}>Split Bill</Button>
    </form>
  );
}
export default App;
