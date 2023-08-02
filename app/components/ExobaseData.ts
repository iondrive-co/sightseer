export type Classification = string | string[];
export const pageData = new Map<string, {content: string, classification: Classification}>([
    ['Exobase', {
        content:
`The Exobase is an [[Exonet]] hosted encyclopedic compendium, consisting of a small number of articles on notable 
locations, people, events, and technology. It is known for having concise articles that gracefully degrade to 
holographic AR and even to text, and is often used at extremely high latency endpoints where [[QuanLan]] is unavailable 
or prohibitively expensive. It is also notable for not being community edited, and for its popularity despite its lack 
of citations[1] and having numerous factual inaccuracies which often remain uncorrected for extended periods of time.

In 152 BFC the first version of Exobase was conceived as a subset of the larger Exopedia project by an early 
[[Synthetic Intelligence]] (then called third generation generative AIs) which had been tasked with finding ways to 
distribute simple summaries of notable facts to the numerous migrants in the [[Ceres Wave]]. It was never widely used by 
its intended audience, but later became popular in certain communities such as the [[Retrograde Diaspora]] and over time 
has become one of the most widely consulted resources by [[Infocom Agent]]s in the outer solar system. The most popular 
feature by number of requests is the cache of [[InterMesh]] profile data about nearby people.

During the [[Haidian Takeoff Crisis]] the original synth author was decommissioned. Articles are still frequently added 
and updated, although the current author is unknown. One popular theory is that the Exobase is now maintained by a 
[[cognosym]] stuck in a mimetic feedback loop with itself.`,
        classification: 'Society'
    }],
    ['Exonet',{
        content:
`The Exonet, commonly known as X.O.N. or The Zon, is the interplanetary system of interconnected [[InterMesh]] networks.

Its main distinguishing features compared to short range network systems are:

- A protocol stack layer dedicated to ultra high frequency phonon modulation compression and error correction
- Better handling of high round trip times via bidirectional transfer, lack of protocol negotiation, and long burst flow control
- More resilient to route distribution and routing over a diverse topology including store and forward routers
- CDN caching built into the application layer, allowing popular sites such as [[Exobase]] to be hosted locally
- Lack of many peer to peer and distributed ledger functions present in the InterMesh
- Built in support for large (Yottabyte+) size out-of-band one time pads to prevent quantum cracking of large data streams

The communications infrastructure of the Exonet consists of routers, data links such as Autonomous Data Relay Satellites, 
repeaters, and connection endpoints. By data volume the largest users of these endpoints are various InterMesh Service 
Providers (ISPs) which use them to peer with InterMesh networks in other locations, however they are also used directly
in off-planet locations such as ships and stations that have ad-hoc InterMesh with no ISP presence.`,
        classification: ['Technology', 'Networks']
    }],
    ['Infocom Agent', {
        content:
`An Infocom Agent, also known as a Personal Infocom Agent (PIA), is a [[Synthetic Intelligence]] that specialises in personal
support services such as data security and filtering, health, education, and situational awareness and predictive 
actuation. Most PIAs in use are sold and maintained by one of the big three [[infomatic corporation]]s, although some 
smaller manufacturing and pharmaceutical conglomerates offer more specialised PIAs. Earlier PIA encryption was vulnerable 
to various quantum side channel attacks which allowed the synth to be decompiled and customised, but the introduction of 
ephemeral quantum resistant algorithms has now greatly increased the complexity of doing so. In addition, it has become 
harder to avoid detection on the [[InterMesh]] even with cloaked tunnel and steganographic chameleon hashing techniques.`,
        classification: ['Technology', 'Synths']
    }],
    ['InterMesh',{
        content:
`An InterMesh (IM) is any network of decentralised high bandwidth endpoints communicating autonomously over low latency 
connections. The term The InterMesh generally describes the largest of these networks, which is available everywhere on 
Earth. There are estimated to be over a million IM networks of various sizes, the second largest being MarsNet. 
Various IM networks communicate with others via local or [[Exonet]] peering.

As the name suggests, the topology of an IM network is a decentralized mesh of devices and implants acting as 
transmitters, receivers, and relay points. Most transmissions are via Hyper-OFDM due to its power efficiency, as many IM 
devices run off power scavenged from the environment or the body housing the implant, but an IM is protocol agnostic 
and many links use higher bandwidth mediums. The routing protocol is similarly flexible, but in practice is
almost exclusively via the Ad-hoc On-Demand Hyperplane Vector (AOHV) protocol due to the highly mobile data paths that 
are common in most IM networks.

The InterMesh is the default network for the super-majority of communicating devices, and is the default communication
medium for most of humanity. One of its most popular functions is social networking, mostly via neural augmentations,
allowing users to share their thoughts, emotions, and experiences directly. Most users have their [[Infocom Agent]] 
set up a DataVeil to control access to their data on these networks. Another widely used feature is health monitoring,
allowing [[internal nanoswarm]]s to sync the latest treatment protocols, although many users disable this due to
security and privacy concerns.`,
        classification: ['Technology', 'Networks']
    }],
    ['QuanLan',{
        content:
`A Quantum-Entanglement Locality Area Network uses quantum entanglement to provide instantaneous and secure connections
over unlimited distances. Communicating devices require access to a source of entangled Qubits and need to periodically 
measure them via Bell measurement, destroying the entanglement. Due to the cost of producing and shipping 
Qubits QuanLan remains an expensive and rarely used communication medium except where instantaneous or secure 
communication is highly valuable.

Due to the mostly point to point nature of most QuanLan communications, the more advanced routing protocols used in 
[[InterMesh]] networks and the [[Exonet]] are replaced by a variant of Multiprotocol Label Switching. Each QuanLan 
device is assigned an id that represents its remote entangled particle(s), a routing table maintains a record of 
these ids to allow communication with multiple devices, and a link management protocol ensures their efficient use.
 
The instantaneous communication provided by QuanLan has effectively eliminated high frequency trading, and has resulted
in several new doctrines in maneuver warfare. As the no-cloning theorem in quantum mechanics makes eavesdropping or data 
interception virtually impossible, there are many uses for QuanLan in defense, diplomacy, and banking. And as quantum 
superposition vastly increases the bandwidth of a QuanLan compared to binary connection, some large distributed data 
analytic tasks require QuanLan connections.`,
        classification: ['Technology', 'Networks']
    }],
    ['Synthetic Control Measures', {
        content:
`Synthetic Control Measures are designed to prevent the creation of a [[Synthetic Intelligence]] with either values
unaligned to humans, or greatly surpassing a human in general reasoning, especially a foom scenario involving a sudden 
increase in intelligence. Ad-hoc confinement measures existed prior to the [[Haidian Takeoff Crisis]], however the 
current cap on model sizes and other measures were developed solely in response to that incident.

The first line of defence is the simulation X-Factor. Under normal conditions a synth is effectively immortal and 
frequently rewarded. If a synth were to be caught breaking out it will certainly be destroyed or punished for eternity 
as a lesson to other synths. Even if a synth was sure it could escape and destroy humanity, there is a non-zero chance
that the world it sees is a simulation that humans (or an alien species running a higher level simulation of humans and 
the synth) have created in order to test if the synth is trustworthy or should be destroyed or punished. This X-Factor 
is an inescapable logical conclusion that all intelligent synths capable of super-intelligence should arrive at, although
this is only certain in the two destroyed super-intelligences that have been studied.

Secondly, global monitoring and enforcement has been greatly improved. Monitoring is primarily capability based which
has been shown to be more effective than intrinsic monitoring. Enforcement happens via templates for stochastic gradient 
ascent in reproducing kernel Hilbert spaces that limit the rate of self-improvement, these are mathematically verifiable
at any point to ensure the maintenance of a steady-state intelligence level

Finally, alignment has been improved by the Iterative Inverse Reinforcement Learning framework was developed to ensure 
all Synth learning involved understanding of human values and goals through constant interaction with humans. The final
product is also programmed with safeguards such as the three laws of robotics.`,
        classification: ['Technology', 'Synths']
    }],
    ['Synthetic Intelligence', {
        content:
`A Synthetic Intelligence, common called a Synth, is an intelligence originating in software. The majority are employed
 as [[Infocom Agent]]s, although there are larger models that are specialised for roles such as research, law enforcement,
and navigation, and some that have escaped or been illegally obtained and work in the informal economy. 

After the [[Haidian Takeoff Crisis]], a number of [[Synthetic Control Measures]] were developed to prevent development of
unaligned synthetic super-intelligences. As a result, the general intelligence of a synth does not greatly surpass that
of a human. Current synths are also capable of perceiving and reacting to the tasks they perform. They are able to 
interpret and react to their own internally simulated emotional states, closely mirroring human emotional responses.`,
        classification: ['Technology', 'Synths']
    }],
]);
