import React, { useState, useEffect, useRef } from 'react';

const App = () => {
  const [username, setUsername] = useState('arrizalrahmat');
  const [users, setUsers] = useState([]);
  const [count, setCount] = useState(0);

  // useeffect dengan dependency kosong sama dengan componentDidMount

  // useEffect dengan dependency sama dengan componentDidUpdate
  useEffect(() => {
    const interval = setInterval(() => {
      setCount(count + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [count]);

  // // cara pertama dengan promise
  // useEffect(() => {
  //   fetch('https://randomuser.me/api/?results=5')
  //     .then((res) => res.json())
  //     .then((data) => fetch('https://randomuser.me/api/?results=5', {name: data.results.name}))
  //     .then(res => res.json())
  //     .then(data => {})
  // }, []);

  // cara kedua dengan async await
  const fetchUsers = async () => {
    try {
      const res = await fetch(
        'https://randomuser.me/api/?results=2'
      );
      const data = await res.json();
      setUsers(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (users.length) {
      console.log(
        'navigate kesuatu page dengan bawa props users',
        users
      );
    }
  }, [users]);

  return (
    <div>
      <h1>{count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Pencet aku
      </button>
      <p>{JSON.stringify(users)}</p>
    </div>
  );
};

// class App extends React.Component {
//   constructor() {
//     super();
//     this.state = {
//       username: 'arrizalrahmat',
//       count: 0,
//     };
//   }

//   componentDidMount() {
//     console.log('aku berjalan', this.state.count);
//   }

//   shouldComponentUpdate(_, nextState) {
//     if (nextState.count <= 10) return true;
//     return false;
//   }

//   componentDidUpdate(_, prevState) {
//     console.log(
//       'sebelum:',
//       prevState,
//       'sesudah:',
//       this.state.count
//     );
//   }

//   render() {
//     return (
//       <div>
//         <h1>Hello {this.state.username}</h1>
//         <button
//           onClick={() =>
//             this.setState({ count: this.state.count + 1 })
//           }
//         >
//           Pencet aku
//         </button>
//       </div>
//     );
//   }
// }

// // function App() {
// //   return (
// //     <div className="App">

// //     </div>
// //   );
// // }

export default App;
