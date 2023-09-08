// import { logout, verifyLogin, auth, col, addDocument, db } from "../../firebase-init.js";
import { db, verifyLogin, auth, logout } from "../../firebase-init.js";
import { collection, addDoc, getDocs, query, orderBy, limit, onSnapshot, doc } from "https://www.gstatic.com/firebasejs/10.3.1/firebase-firestore.js";

verifyLogin();

document.getElementById("logout-btn-modal").addEventListener("click", () => {
  document.getElementById("boxLoader").style.display = "flex";
  logout().then(() => {
    document.getElementById("boxLoader").style.display = "none";
  });
});

// document.getElementById("send-btn").addEventListener("click", () => {
//   let inputMessage = document.getElementById("input-message");

//   if (inputMessage.value) {
//     sendMessage(inputMessage.value);
//     inputMessage.value = "";
//     inputMessage.focus();
//   } else {
//     console.log("Digite um valor");
//   }
// });

// function getTimestampDataOntem() {
//   const dataOntem = new Date(); // Obtém a data atual
//   dataOntem.setDate(dataOntem.getDate() - 1); // Subtrai um dia

//   const timestamp = dataOntem.getTime(); // Obtém o timestamp em milissegundos

//   return timestamp;
// }

const sendMessage = async () => {
  try {
    const docRef = await addDoc(
      collection(db, "restaurantes")

      // {
      //   message: message,
      //   created: new Date(),
      //   user: {
      //     email: findUser().email,
      //     name: findUser().displayName,
      //     photoURL: findUser().photoURL,
      //     uid: findUser().uid,
      //   },
      // }
    );
  } catch (e) {
    console.error("Error adding document: ", e);
  }
};

const createCardsRestaurant = (restaurants) => {
  let allRestaurants = "";
  let HTML = ";";
  restaurants.forEach((restaurant) => {
    HTML = `
      <div class="card-restaurant">
        <div class="box-img-text-restaurant">
          <img class="img-card-restaurant" src="https://static.ifood-static.com.br/image/upload/t_high/logosgde/2710821c-6f3f-426a-aa0c-551f0444a778/202206170346_I8Jz_i.jpg" alt="" />
          <div>
            <h4>${restaurant.NomeRestaurante}</h4>
            <span class="infos-card-restaurant">
              <!-- <i class="fa-solid fa-star"></i>
              <p class="rating-card-restaurant">4,9</p> -->
              <p class="info-card-restaurant">Lanches</p>
            </span>
            <p class="info-card-restaurant-2">${restaurant.HorarioFuncionamento}</p>
          </div>
        </div>
        <div>
          <i class="fa-regular fa-heart icon-fav-card-restaurant"></i>
        </div>
      </div>`;
    allRestaurants += HTML;
  });
  document.getElementById("container-restaurants").innerHTML = allRestaurants;
  document.getElementById("boxLoader").style.display = "none";
};

// sendMessage();

const findUser = () => {
  return auth.currentUser;
};

const findMessages = async () => {
  document.getElementById("boxLoader").style.display = "flex";

  const messagesDb = collection(db, "restaurantes");
  const q = await query(messagesDb);
  // , orderBy("created", "asc"), limit(5000));
  const querySnapshot = await getDocs(q);
  console.log(querySnapshot);
  let messages = [];
  querySnapshot.forEach((doc) => {
    messages.push(doc.data());
  });
  console.log(messages);
  createCardsRestaurant(messages);
  return messages;
};

findMessages();

const start = async () => {
  document.getElementById("boxLoader").style.display = "flex";
  const messagesDb = collection(db, "messages");
  const q = await query(messagesDb, orderBy("created", "asc"), limit(5000));
  document.getElementById("boxLoader").style.display = "none";

  await onSnapshot(q, (snapshot) => {
    let messages = [];
    snapshot.docs.forEach((doc) => {
      messages.push({ ...doc.data(), id: doc.id });
    });
    // console.log("messages: ", messages);
    // createMessages(messages).then(() => {
    //   document.getElementById("boxLoader").style.display = "none";
    //   rollEnd();
    // });
  });
};

document.getElementById("profile-pic").setAttribute("src", localStorage.getItem("profilePic"));

// start();

// Modal

const openModalBtn = document.getElementById("logout-btn");
const modal = document.getElementById("myModal");
const cancelBtn = document.getElementById("cancel-btn");

openModalBtn.addEventListener("click", () => {
  modal.style.display = "flex";
});

cancelBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

// const arrayObjetos = [
//   { chave: "valor1" },
//   { chave: "valor2" },
//   { chave: "valor1" },
//   { chave: "valor3" },
// ];

// arrayObjetos.forEach((elemento, index, array) => {
//   if (index < array.length - 1) {
//     const proximoElemento = array[index + 1];
//     if (elemento.chave === proximoElemento.chave) {
//       console.log(`O elemento ${index + 1} possui a mesma chave que o próximo elemento.`);
//     }
//   }
// });
