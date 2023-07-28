export const pageData = new Map<string, {content: string, classification: string}>([
    ['Exobase', {
        content:
`The Exobase is an [[Exonet]] hosted encyclopedic compendium, consisting of a small number of articles on notable 
locations, people, events, and technology. It is known for having concise articles that gracefully degrade to 
holographic AR and even to text, and is often used at extremely high latency endpoints where [[QuanLan]] is unavailable 
or prohibitively expensive. It is also notable for not being community edited, and for its popularity despite its lack 
of citations[1] and having numerous factual inaccuracies which often remain uncorrected for extended periods of time.

In 2052 the first version of Exobase was conceived as a subset of the larger Exopedia project by a third generation 
generative AI which had been tasked with finding ways to distribute simple summaries of notable facts to the numerous 
migrants in the [[Ceres Wave]]. It was never widely used by its intended audience, but later became popular in certain 
communities such as the [[Retrograde Diaspora]] and over time has become one of the most widely consulted resources by 
[[infocom agent]]s in the outer solar system. The most popular feature by number of requests is the cache of 
[[InterMesh]] profile data about nearby people.

During the [[Value Crisis]] the original AI author was decommissioned. Articles are still frequently added and updated, 
although the current author is unknown. One popular theory is that the Exobase is now maintained by a [[cognosym]] 
stuck in a mimetic feedback loop with itself.
`,
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

The communications infrastructure of the Exonet consists of routers, data links such as [[Autonomous Data Relay Satellite]]s, 
repeaters, and connection endpoints. By data volume the largest users of these endpoints are various InterMesh Service 
Providers (ISPs) which use them to peer with InterMesh networks in other locations, however they are also used directly
in off-planet locations such as ships and stations that have ad-hoc InterMesh with no ISP presence.
`,
        classification: 'Technology'
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
allowing users to share their thoughts, emotions, and experiences directly. Most users have their [[infocom agent]] 
set up a DataVeil to control access to their data on these networks. Another widely used feature is health monitoring,
allowing [[internal nanoswarm]]s to sync the latest treatment protocols, although many users disable this due to
security and privacy concerns.
`,
        classification: 'Technology'
    }],
    ['QuanLan',{
        content:
`A Quantum-Entanglement Locality Area Network uses quantum entanglement to provide instantaneous and secure connections
over unlimited distances. Communicating devices require access to a source of entangled Qubits and need to periodically 
measure them via Bell measurement, destroying the entanglement. Due to the cost of producing and shipping 
Qubits QuanLan remains an expensive and rarely used communication medium except where instantaneous or secure 
communication is highly valuable.

Each QuanLan device is assigned a QID that represents its remote entangled particle(s) in the network. QuanLan uses 
Quantum Routing Tables (QRT) to maintain a record of these QIDs and their corresponding Quantum Entanglement States 
(QESs) when communicating with multiple devices. To manage the finite resource of entangled particles, a Quantum Link 
Management Protocol (QLMP) is used. Due to the mostly point to point nature of most QuanLan communications, the
more advanced routing protocols used in [[InterMesh]] networks and the [[Exonet]] are not used.
 
The instantaneous communication provided by QuanLan has effectively eliminated high frequency trading, and has resulted
in several new doctrines in maneuver warfare. The no-cloning theorem in quantum mechanics makes eavesdropping or data 
interception virtually impossible, which has uses in defense, diplomacy, and banking. Finally, due to superposition 
vastly increasing the bandwidth of a QuanLan compared to binary connection, some large data analytic tasks generally 
require QuanLan connections.
`,
        classification: 'Technology'
    }],
]);
