export const getRandomPrompts = (numberOfPlayers: number): string[] => {
  //graphql appears not to support nested arrays
  let randomPrompts: string[] = []
  for (let i = 0; i < numberOfPlayers; i++){
    const randomIndex = Math.floor(Math.random() * prompts.length-1);
    randomPrompts = randomPrompts.concat(prompts.slice(randomIndex, randomIndex + 6))
  }
  return randomPrompts;
}

const prompts = ["surfing llama", "a fish swimming into another fish", "a shark eating a cake", "a crab at a birthday party", "a seahorse in a blizzard", "a dinosaur crying", "a person with arms for legs", "a pig on a treadmill", "a horse throwing a horseshoe", "a walrus in a beach chair", "a shark waterskiing", "a koala sitting on a trash can", "a lizard putting on lipstick", "a squirrel roasting a marshmellow", "an octopus with spoons for legs", "a mouse riding a motorcycle", "a flamingo dancing", "a butterfly eating a steak", "a cat playing basktball", "a chicken skydiving", "a poptart lifting weghts", "french fries on a rollercoaster", "a strawberry astronaut", "a food eating another food", "a walking taco", "asparagus snowboarding", "a pirate in a hammock", "a cowboy riding a polar bear", "yourself with a beard"]