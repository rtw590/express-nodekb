//  Vue instance

new Vue ({
    el: '#vue-app',
    //  Vue Data
    data: {
        wood: 0,
        brick: 0,
        sheep: 0,
        wheat: 0,
        ore: 0,
        roads: 2,
        settlements: 2,
        cities: 0,
        roadsRemaining: 10,
        settlementsRemaining: 6,
        citiesRemaining: 4,
        victoryPoints: 2,
        longestRoad: false,
        largestArmy: false,
        longestRoadColor: "error",
        knights: 0,
        victoryPointCards: 0,
        monopoly: 0,
        roadBuildingCard: 0,
        yearOfPlenty: 0,
        knightsPlayed: 0,
        diceResult: 0,
        die1: 0,
        die2: 0
    },
    //  Vue Methods: Can hold functions
    methods: {
        addWood: function(inc) {
            this.wood += inc;
        },
        subtractWood: function(dec) {
            this.wood -= dec;
        },
        addBrick: function(inc) {
            this.brick += inc;
        },
        subtractBrick: function(dec) {
            this.brick -= dec;
        },
        addSheep: function(inc) {
            this.sheep += inc;
        },
        subtractSheep: function(dec) {
            this.sheep -= dec;
        },
        addWheat: function(inc) {
            this.wheat += inc;
        },
        subtractWheat: function(dec) {
            this.wheat -= dec;
        },
        addOre: function(inc) {
            this.ore += inc;
        },
        subtractOre: function(dec) {
            this.ore -= dec;
        },
        buildRoad: function(inc) {
            if (this.wood >= 1 && this.brick >= 1) {
                this.wood -= 1;
                this.brick -= 1;
                this.roads += inc;
                this.roadsRemaining -= inc;
            }
        },
        buildSettlement: function(inc) {
            if (this.wood >= 1 && this.brick >= 1 && this.sheep >= 1 && this.wheat >= 1 && this.settlementsRemaining >= 1) {
                this.wood -= 1;
                this.brick -= 1;
                this.sheep -= 1;
                this.wheat -= 1;
                this.settlements += inc;
                this.settlementsRemaining -= inc;
                this.victoryPoints += inc;
            }
        },
        buildCity: function(inc) {
            if (this.wheat >= 2 && this.ore >= 3 && this.citiesRemaining >= 1 && this.settlements >= 1) {
                this.wheat -= 2;
                this.ore -= 3;
                this.cities += inc;
                this.citiesRemaining -= inc;
                this.settlementsRemaining += inc;
                this.settlements -= inc;
                this.victoryPoints += inc;
            }
        },
        buyDevelopmentCard: function() {
            if (this.wheat >= 1 && this.ore >= 1 && this.sheep >= 1) {
                this.wheat -= 1;
                this.ore -= 1;
                this.sheep -= 1;
            }
        },
        longestRoadVP: function() {
            if (this.longestRoad) {
                this.victoryPoints += 2
            } else {
                this.victoryPoints -= 2
            }
        },
        largestArmyVP: function() {
            if (this.largestArmy) {
                this.victoryPoints += 2
            } else {
                this.victoryPoints -= 2
            }
        },
        addRoadBuildingCard: function(inc) {
            this.roadBuildingCard += inc;
        },
        subtractRoadBuildingCard: function(dec) {
            if (this.roadBuildingCard > 0) {
                this.roadBuildingCard -= dec;
            }
        },
        addVictoryPointCards: function(inc) {
            this.victoryPointCards += inc;
            this.victoryPoints += inc;
        },
        subtractVictoryPointCards: function(dec) {
            if (this.victoryPointCards > 0) {
                this.victoryPointCards -= dec;
                this.victoryPoints -= dec;
            }
        },
        addKnights: function(inc) {
            this.knights += inc;
        },
        subtractKnights: function(dec) {
            if (this.knights > 0) {
                this.knights -= dec;
                this.knightsPlayed += dec;
            }
        },
        addMonopoly: function(inc) {
            this.monopoly += inc;
        },
        subtractMonopoly: function(dec) {
            if (this.monopoly > 0) {
                this.monopoly -= dec;
            }
        },
        addYearOfPlenty: function(inc) {
            this.yearOfPlenty += inc;
        },
        subtractYearOfPlenty: function(dec) {
            if (this.yearOfPlenty > 0) {
                this.yearOfPlenty -= dec;
            }
        },
        diceRoll: function() {
            this.die1 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            this.die2 = Math.floor(Math.random() * (6 - 1 + 1)) + 1;
            this.diceResult = this.die1 + this.die2
        }
    },
    // Different than methods. Lookup documentation to understand better
    computed: {
        
    }
});
