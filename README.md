# gify

Hello! Welcome to gify (гифы), which is the Russian word for hyphae -- the
branching filaments that make up the mycelium of fungi.

You can find the current demo deployed to Ropsten @ https://shroom.raptor.pizza

Background:

This was developed & designed for the Truffle University flagship course, many
thanks to them for providing the context and resources to keep me on track for
sort of finishing something.

The initial idea for this project was to create a game akin to Morels (a super
fun card game that involves collecting mushrooms), with various token types for
collecting and producing mushrooms. After many mental iterations, I decided to
reduce the idea to just playing with the idea of creating ERC721
mushrooms/toadstools. For some reason I then thought it would be a good idea to
combine this with an experiment to use React context to create a ThreeJS
instance that all components have access to produce and visualize 3D toadstools.
This created some hilarious interactions between Drizzle's subscription to the
blockchain and ThreeJS renders, which suddenly added a ton of complexity to my
data rerenders + ThreeJS object creation.

The contract structure is a very naive implementation modeling the lifecycle of
fungi, with the Mycelium having executive control over the Hyphae, which in turn
produce Spores and Toadstools. My idea was to have the user collect Spores on
the frontend, which they could then combine to create Toadstools of various
colors using simple RBG values. I did not fully implement this idea, because I
realized that this interaction was not locked down enough, in that someone could
easily send signals to the contracts without using the frontend. Nonetheless,
the frontend still has the fun of clicking around in a 3D space while looking at
floating toadstools and orbs, transmuting toadstools using pretty colors, and
seeing a visual stack of the toadstools you have created.
