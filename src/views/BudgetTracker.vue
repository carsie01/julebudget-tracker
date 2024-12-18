<template>
  <div class="tracker-container">
    <!-- Budget Overview -->
    <div class="budget-overview">
      <!-- Redigeringstilstand -->
      <div v-if="isEditingBudget" class="edit-budget">
        <p><strong>Rediger Budget:</strong></p>
        <input
          type="number"
          v-model.number="newBudget"
          placeholder="Nyt samlet budget"
        />
        <button @click="saveBudget">Gem</button>
        <button @click="cancelEditBudget">Annuller</button>
      </div>

      <!-- Normal visningstilstand -->
      <div v-else>
        <p class="budget-h"><strong>Budget:<br></strong> {{ totalBudget }} kr</p>
        <button @click="editBudget">Rediger</button>
        <div class="budget-overview2">
          <p><strong>Købt:</strong><br> {{ totalSpent }} kr</p>
          <p><strong>Tilbage:</strong><br> {{ remainingBudget }} kr</p>
        </div>
      </div>
    </div>

    <!-- Add Gift Button -->
    <div class="add-gift">
      <button @click="showGiftPopup = true">Tilføj Gave</button>
    </div>

    <!-- Gift Sections -->
    <div class="gift-sections">
      <div
        v-for="(person, index) in giftList"
        :key="index"
        class="gift-box"
      >
        <!-- Redigerbar Input -->
        <div v-if="editingPersonIndex === index">
          <h3>
            <input v-model="person.name" placeholder="Navn" />
          </h3>
          <p>
            <strong>Budget:</strong><br>
            <input type="number" v-model.number="person.budget" /> kr
          </p>

          <!-- Gaveliste med redigering -->
          <ul>
            <li v-for="(gift, idx) in person.gifts" :key="idx">
              <input v-model="gift.name" placeholder="Gavens navn" />
              -
              <input
                type="number"
                v-model.number="gift.price"
                placeholder="Pris"
              /> kr
              <input
                type="checkbox"
                v-model="gift.bought"
                @change="updateBudget"
              />
            </li>
          </ul>

          <!-- Tilføj Ny Gave -->
          <div class="add-new-gift">
            <h4>Tilføj Ny Gave:</h4>
            <input v-model="newGiftName" placeholder="Gave til :" />
            <input
              type="number"
              v-model.number="newGiftPrice"
              placeholder="Pris"
            /> kr
            <button @click="addNewGift(index)">Tilføj Gave</button>
          </div>

          <button @click="savePerson">Gem</button>
          <button @click="cancelEdit">Annuller</button>
        </div>

        <!-- Visningsmodus -->
        <div v-else>
          <h3>{{ person.name }}</h3>
          <p><strong>Budget:</strong><br> {{ person.budget }} kr</p>
          <ul>
            <li
              v-for="(gift, idx) in person.gifts"
              :key="idx"
            >
              {{ gift.name }} - {{ gift.price }} kr
              <input
                type="checkbox"
                v-model="gift.bought"
                @change="updateBudget"
              />
            </li>
          </ul>
          <button @click="editPerson(index)">Rediger</button>
        </div>
      </div>
    </div>

    <!-- Popup for Adding Gifts -->
    <div v-if="showGiftPopup" class="popup">
      <div class="popup-content">
        <h3>Tilføj Gave</h3>
        <label for="person">Hvem:</label>
        <input type="text" id="person" v-model="newGiftPerson" />
        
        <label for="budget">Budget:</label>
        <input type="number" id="budget" v-model="newGiftBudget" />
        
        <label for="gift">Gave:</label>
        <input type="text" id="gift" v-model="newGiftName" />
        
        <label for="price">Pris:</label>
        <input type="number" id="price" v-model="newGiftPrice" />

        <button @click="addGift">Tilføj</button>
        <button @click="showGiftPopup = false">Luk</button>
      </div>
    </div>
  </div>
</template>


<script>
export default {
  data() {
    return {
      // Budget Information
      totalBudget: 5000,
      totalSpent: 0,
      remainingBudget: 5000,
      isEditingBudget: false,
      newBudget: 0,

      // Gave Information
      giftList: [
        {
          name: 'Mor',
          budget: 700,
          gifts: [
            { name: 'Uld Tæppe', price: 179, bought: false },
            { name: 'Hjemmesko', price: 350, bought: false },
          ],
        },
        {
          name: 'Søster',
          budget: 700,
          gifts: [
            { name: 'Parfume', price: 179, bought: false },
            { name: 'Øreringe', price: 350, bought: false },
          ],
        },
      ],

      // Popup Control
      showGiftPopup: false,

      // Ny Gave Form Data
      newGiftPerson: '',
      newGiftBudget: 0,
      newGiftName: '',
      newGiftPrice: 0,

      // Editing State
      editingPersonIndex: null,
    };
  },
  methods: {
    addGift() {
      let person = this.giftList.find((p) => p.name === this.newGiftPerson);
      if (!person) {
        person = { name: this.newGiftPerson, budget: this.newGiftBudget, gifts: [] };
        this.giftList.push(person);
      }
      person.gifts.push({ name: this.newGiftName, price: this.newGiftPrice, bought: false });
      this.updateBudget();
      this.resetPopup();
    },
    addNewGift(index) {
      const person = this.giftList[index];
      if (this.newGiftName && this.newGiftPrice > 0) {
        person.gifts.push({ name: this.newGiftName, price: this.newGiftPrice, bought: false });
        this.newGiftName = '';
        this.newGiftPrice = 0;
        this.updateBudget();
      }
    },
    editPerson(index) {
      this.editingPersonIndex = index; // Sæt redigeringstilstanden
    },
    savePerson() {
      this.updateBudget();
      this.editingPersonIndex = null; // Afslut redigering
    },
    cancelEdit() {
      this.editingPersonIndex = null; // Annuller redigering
    },
    editBudget() {
      this.newBudget = this.totalBudget;
      this.isEditingBudget = true;
    },
    saveBudget() {
      if (this.newBudget > 0) {
        this.totalBudget = this.newBudget;
        this.remainingBudget = this.totalBudget - this.totalSpent;
      }
      this.isEditingBudget = false;
    },
    cancelEditBudget() {
      this.isEditingBudget = false;
    },
    updateBudget() {
      this.totalSpent = this.giftList.reduce(
        (sum, person) =>
          sum +
          person.gifts.reduce((giftSum, gift) => giftSum + (gift.bought ? gift.price : 0), 0),
        0
      );
      this.remainingBudget = this.totalBudget - this.totalSpent;
    },
    resetPopup() {
      this.newGiftPerson = '';
      this.newGiftBudget = 0;
      this.newGiftName = '';
      this.newGiftPrice = 0;
      this.showGiftPopup = false;
    },
  },
  mounted() {
    this.updateBudget();
  },
};
</script>
