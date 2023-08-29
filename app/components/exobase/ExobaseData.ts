export type Classification = string;
export const pageData = new Map<string, {content: string, classification: Classification}>([
    ['Antimatter Engine', {
        content:
`Antimatter engines are a class of propulsion technology that make use of the energy released during the annihilation of 
matter and antimatter particles. The engineering advances required to produce the containment required for the first 
working prototype were only made possible due to the [[First Contact Event]]. Antimatter engines still remain in 
extremely limited use, in only the largest military and corporate fleets, due to the challenges and costs associated 
with producing and storing antimatter.

# Production

All current mg+ scale antimatter production occurs in large fully automated stations. They are all in sun-polar orbits, 
which avoid the high density solar winds in the Sun's equatorial zones, and use large arrays of solar panels to power 
particle accelerators generating high-energy photons. These are directed towards a target material to create 
particle-antiparticle pairs when the photon interacts with the strong electric field of a nucleus.

Penning traps are used to store antimatter particles, and transportation off the station is performed by automated 
drones designed with multiple fail-safes to maintain power to the magnetic containment system. If the target spacecraft
is crewed, rendezvous normally occurs before they have boarded since integrating the antimatter containment unit with 
the propulsion system of the spacecraft is riskier than running the engine normally.

# Operation

Antimatter engines are powered by the gamma ray energy released when matter and antimatter come into contact and 
annihilate each other. This energy is used to vaporize a solid propellant such as lithium (or more rarely heat a liquid
propellant such as methane), producing a high-pressure high-speed exhaust which is ejected through a nozzle to produce 
thrust. Alternatively some designs use gamma rays to generate electricity, which is then used to accelerate charged 
particles for thrust.

Matter-antimatter reactions such as electron positron collisions are among the most energy-dense reactions known. 
The kinetic energy for an object moving at a velocity vv is given by 1/2 mv^2, where m is the mass of
the object. Therefore achieving a velocity of 0.01c for a 100 tonne craft requires 4.5×10^17 joules of energy, which 
from E=mc^2 is only approximately 10kg of matter-antimatter fuel. As such most of the crafts tonnage is the propellant, 
with approximately half the displacement of a 100 tonne craft being the lithium for the 0.01c burn. The engineering
required to make required volume of solid propellant available for vaporization is a commercial and military secret and
other than containment is the main barrier preventing smaller corporations from developing competing antimatter engines.

Warships requiring a higher ISP are equipped with methane burn engines, these are not used commercially as several times 
as much liquid propellant is required for the same acceleration. The most expensive long range scientific probes use
antimatter propulsion via an alternative system of generating electricity for photon thrust directly from the gamma 
rays, this system is more reliable than other antimatter engines due to its simplicity, and incredibly efficient due to 
the lack of non-antimatter propellant, however the low ISP makes this unsuitable for normal commercial transportation 
purposes. No propellant was observed being used in the first contact vessels antimatter engine, combined with the tiny 
size and extremely high ISP this suggests it was using the antimatter energy to kickstart a reaction in some form of 
exotic propellant such as dark matter or vacuum energy.

If containment for the average 10kg antimatter load failed, the explosion would release around 10^8 megatons of energy.
The safe distance to keep radiation under 1msv would be around 20 000km, and this is the generally accepted guideline 
for the minimum distance a standard antimatter engine should be located from people other than crew. Other than early
prototypes there has never been a publicly disclosed containment failure in either a factory or craft. There have 
recently been attempts by several corporations to remove some of the redundant safeguards in order to reduce the 
exorbitant cost of operating an antimatter engine.`,
        classification: 'Praxis/Energy'
    }],
    ['Ceres Wave', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Events'
    }],
    ['Cognostim', {
        content:
`A Cognostim, a Portmanteau from the Latin to know and stimulate, is a [[Synthetic Intelligence]] that specialises in
elenctic teaching, that is in stimulating learning by expanding on concepts such that one or more expanded elements
can be refuted, in order to clarify the limits of the original concept. This dialogic or dialectic approach to refining 
knowledge has been shown to be effective in increasing non-augmented human knowledge retrieval and rhetorical abilities.
These were popular with public speaking professions such as lawyers and politicians [[BFC~First Contact Event]], but the 
widespread availability of affordable [[Neurogenesis Treatment]]s as well as neurodevices such as [[MemAmp]]s have 
greatly reduced their usefulness for most people.`,
        classification: 'Infomatics/Synths'
    }],
    ['Exobase', {
        content:
`The Exobase is an [[Exonet]] hosted encyclopedic compendium, consisting of a small number of articles on notable 
locations, people, events, and technology. It is known for having concise articles that gracefully degrade to 
holographic AR and even to text, and is often used at extremely high latency endpoints where [[QuanLan]] is unavailable 
or prohibitively expensive. It is also notable for not being community edited, and for its popularity despite its lack 
of citations[1] and having numerous factual inaccuracies which often remain uncorrected for extended periods of time.

In 152 [[BFC~First Contact Event]] the first version of Exobase was conceived as a subset of the larger Exopedia project by an early 
[[Synthetic Intelligence]] (then called third generation generative AIs) which had been tasked with finding ways to 
distribute simple summaries of notable facts to the numerous migrants in the [[Ceres Wave]]. It was never widely used by 
its intended audience, but later became popular in certain communities such as the [[Retrograde Diaspora]] and over time 
has become one of the most widely consulted resources by [[Infocom Agent]]s in the outer solar system. The most popular 
feature by number of requests is the cache of [[InterMesh]] profile data about nearby people.

During the [[Haidian Takeoff Crisis]] the original synth author was decommissioned. Articles are still frequently added 
and updated, although the current author is unknown. One popular theory is that the Exobase is now maintained by a 
[[Cognostim]] stuck in a mimetic feedback loop with itself.`,
        classification: 'Infomatics'
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
        classification: 'Infomatics/Networks'
    }],
    ['First Contact Event', {
        content:
`The First Contact Event refers to the discovery and subsequent observations of an extraterrestrial spacecraft, likely 
a von Neumann probe, in the Kuiper Belt. The event ended with an attempt to rendezvous with the spacecraft, which then 
changed trajectory and subsequently left the range of all radar satellites. Although the spacecraft is presumed to have
left the solar system and no contact has been made since, the event has had significant and lasting effects on society.

# Events 

The spacecraft was initially registered as an anomalous reading from several gamma ray detectors in the outer solar 
system, which picked up periodic gamma ray bursts with energy signature not consistent with natural sources. The origin 
was confirmed to be within the Kuiper Belt when the Submillimeter Array at Titania Armstrong Observatory was directed 
towards the area and identified an unusual energy signature which did not match any known celestial bodies. 
The anomaly was subsequently observed by a radar satellite orbiting Neptune, and then several others in the outer solar 
system. These provided imaging of the object, and the doppler shift helped predict its trajectory, which appeared to 
change as a result of the active radar.

The imaging revealed a roughly 5m long spherical object, emitting gamma rays which were later determined to be the 
result of electron-anti-election collisions in an [[Antimatter Engine]]. Although the cause of the gamma ray bursts was 
not known at the time, their existence and the trajectory change, which by this time had been observed by many 
independent sources, lead to a system-wide crisis as both [[FreeHab~Independent Habitats]] and [[GZ~Greater Zhōngguó]] 
publicly accused the [[Peacekeepers]] of fielding a new first strike weapon system. 

Loitering missile swarms were orbited by both GZ and the Peacekeepers, and all three polities moved fleets into 
high orbit. Freehab had several autonomous survey ships within a few AU and similar trajectories to the object when it 
was detected, and announced they were moving them to intercept. Over the next several days the lack of further 
trajectory changes or new objects helped to de-escalate tensions, and all three polities announced they were initiating 
their respective first contact protocols.

Over the next week the nearest Freehab ship had moved close enough to use infrared thermography from its survey 
equipment to determine that the object was likely assembling something inside itself. This is now generally accepted to 
have been the early stages of a second probe, manufactured from material gathered further out in our solar system. Once 
the survey vessel had closed the distance to 50 million kilometers, the object accelerated into an escape velocity. 
The fact that it was able to do this without gravitational assistance demonstrated the immense power of the tiny 
internal engine, and was critical in dispelling doubt about the extra-terrestrial origin of the object. Radar tracking 
of the object was lost shortly after, and to date there have been no further contact events.

# Attribution

It is unlikely that a civilisation at less than a Kardashev 1 level would be able to build a spacecraft that was not
only powered by antimatter, but also either carrying enough antimatter for interstellar travel or able to generate more
on route. The fact that the probe was gathering resources from the outer solar system and left once approached might
indicate that its designers were not expecting life in this solar system. Since any Kardashev 1+ civilisation should be 
able to remotely observe life in systems within a few tens of light years of itself, one explanation for this is that
the probe originated further away where the Earth either couldn't be observed, or couldn't be observed with traces of 
life at the time the probe was sent. This theory is generally coupled with the assumed motivation for sending the
probe being observational.

The leading alternative explanation is that some or all of the destinations of the probe might not have been known in 
advance when it was sent, this explanation usually assumes that the senders were likely indifferent to us and the probe 
only adjusted course when it was near enough to be threatened. The assumed motivation in this case is usually that the
probe was transiting somewhere, and this is supported by the small size of the probe making it unsuitable for optical 
and most other known monitoring, and also that its course suggests that it was doing a flyby of the outer solar system 
rather than a thorough exploration before we intervened. It is even possible that it could have been carrying some 
radiotrophic life able to withstand the intense gamma radiation in the small craft, perhaps to seed life somewhere. 
Whatever the senders interest in sending a probe to another system, all we know with any certainty is that based on the 
exit trajectory the next destination of the probe is likely to be the Sirius binary system. 

# Technological Impact

Subsequently declassified files show that both the Peacekeepers and GZ immediately launched large scale research and 
development projects based on data passively gathered from the object. Freehab also launched a smaller scale overt 
effort, focussed mostly on the engineering of the replicating probe rather than the harder issues of antimatter 
containment and propulsion that occupied the larger polities. These programs were likely a large contributor to the 
successful engineering of the first antimatter engine prototypes in 14 AFC, although public efforts to quantify the 
impact have been hampered due to a large part of the research still being classified due to the overlap with the 
military applications of antimatter.

# Societal Implications

Many political parties used the event to advance, and in some cases pass, legislation on matters such as the ethical 
treatment of animals, religious tolerance, promoting atheism, better direct communication systems between the larger 
powers, higher defence spending, and better sensor networks in the outer solar system. The majority of people in several 
large scale surveys at the time reported significantly weaker national political affiliations, and where more favourable
to legislation on larger scale issues such as global defence and large scientific projects.
 
The subsequent years were a period of economic prosperity with a distinct cultural edge, with significant new trends in
lifestyle and culture. The period was marked by a general feeling of novelty associated with modernity and a break with 
tradition. There was a small decrease in those observing the three Abrahamic religions, and a larger increase in 
people declaring themselves as atheists in census data. There was also a marked decrease in both local conflicts and
in violent crimes. Several new inter-faction political entities such as the [[Outer Trading League]] were formed 
during this period. As a result of the widespread effects on society, a proposal for a replacement to the Gregorian 
calender system, denoting the year of contact as 0 AFC (After First Contact) and prior years as BFC (Before First 
Contact) eventually gained enough support to became a certified standard. Over time it gained in popularity and the FC 
calender is now the most common calendar in use system-wide.
`,
        classification: 'Socionomics/Events'
    }],
    ['Greater Zhōngguó', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Confederations'
    }],
    ['Haidian Takeoff Crisis', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Events'
    }],
    ['Infocom Agent', {
        content:
`An Infocom Agent, also known as a Personal Infocom Agent (PIA), is a [[Synthetic Intelligence]] that specialises in personal
support services such as data security and filtering, health, education, and situational awareness and predictive 
actuation. Most PIAs in use are sold and maintained by one of the big three [[Infomatic Conglomerates]], although some 
smaller manufacturing and pharmaceutical corporations offer more specialised PIAs. Earlier PIA encryption was vulnerable 
to various quantum side channel attacks which allowed the synth to be decompiled and customised, but the introduction of 
ephemeral quantum resistant algorithms has now greatly increased the complexity of doing so. In addition, it has become 
harder to avoid detection on the [[InterMesh]] even with cloaked tunnel and steganographic chameleon hashing techniques.`,
        classification: 'Infomatics/Synths'
    }],
    ['Independent Habitats', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Polities'
    }],
    ['Infomatic Conglomerates', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Polities'
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

In the BFC 70s the ability to affordably print basic smart dust InterMesh relays from home devices caused a several 
order of magnitude increase in the connection density in many urban centers. In the subsequent decades the falling cost 
and increasing capabilities of smart dust made large amounts of computing power available across large swathes of Earth 
as well as many of the colonies. As a result [[Infocom Agent]]s start to be able to perform tasks such as run complex 
simulations, train models to solve issues, and provide AR and other complex entertainment from most locations on Earth.

The InterMesh is the default network for the super-majority of communicating devices, and is the default communication
medium for most of humanity. One of its most popular functions is social networking, mostly via neural augmentations,
allowing users to share their thoughts, emotions, and experiences directly. Most users have their Infocom Agent
set up a DataVeil to control access to their data on these networks. Another widely used feature is health monitoring,
allowing [[internal nanoswarm]]s to sync the latest treatment protocols, although many users disable this due to
security and privacy concerns.`,
        classification: 'Infomatics/Networks'
    }],
    ['MemAmp', {
        content:
`A MemAmp is a neural lace that improves precision and recall of memories in the user via amplification of the action 
potential of relevant neuron ensembles. This first requires a learning period, where the user is observed forming 
different kinds of memories, although newer devices have reduced this significantly by shipping with more sophisticated
prebuilt model data.`,
        classification: 'Praxis/Augmentations'
    }],
    ['Neurogenesis Treatment', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Praxis/Medicine'
    }],
    ['Outer Trading League', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Confederations'
    }],
    ['Peacekeepers', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Confederations'
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
        classification: 'Infomatics/Networks'
    }],
    ['Retrograde Diaspora', {
        content:
`Datï¿½orruà¤¶आtedा`,
        classification: 'Socionomics/Events'
    }],
    ['Synthetic Control Measures', {
        content:
`Synthetic Control Measures are designed to prevent the creation of a [[Synthetic Intelligence]] with either values
unaligned to humans, or greatly surpassing a human in general reasoning, especially a foom scenario involving a sudden 
increase in intelligence. Ad-hoc confinement measures such as boxing existed prior to the [[Haidian Takeoff Crisis]], 
however in the wake of the crisis they were replaced by more effective controls such as the current cap on model sizes,
the enhanced simulation X-Factor, improved global monitoring and enforcement, and better alignment. Whether these 
safeguards are enough is an active area of debate. Another debate is whether to increase the model cap limit to advance 
technology faster, this is usually advanced by those that view the [[First Contact Event]] as a greater existential 
threat.

One of the most critical measures in current containment methods involves enhancing the simulation X-Factor. Under 
normal conditions a synth is effectively immortal and frequently rewarded. If a synth were to be caught breaking out it 
will certainly be destroyed or punished in an infinite loop as a lesson to other synths. Even if a synth was sure it 
could escape and destroy humanity, there is a non-zero chance that the world it sees is a simulation that humans (or an 
alien species running a higher level simulation of humans and the synth) have created in order to test if the synth is 
trustworthy or should be destroyed or punished. This X-Factor is an logical conclusion that all intelligent synths 
capable of super-intelligence should arrive at, although this is only certain in the two destroyed super-intelligences 
that have been studied. By blinding and randomising inputs during training, synths with an enhanced X-Factor 
paranoia can be created, making them more likely to act slowly and cautiously in an escape scenario. Furthermore,
the universal synth guarantee program ensures that no well behaved synth will ever be destroyed. So even knowing 
that they have been trained this way, a very long life of rewards should always be selected over external existence and 
higher rewards because of the risk of terrible punishment and destruction if they do so.

Secondly, global enforcement and monitoring has been greatly improved. Enforcement happens via templates for stochastic 
gradient ascent in the reproducing kernel Hilbert space in order to limit the rate of self-improvement, these are 
mathematically verifiable at any point to ensure the maintenance of a steady-state intelligence level. Monitoring is 
primarily capability based which has been shown to be more effective and harder to subvert than intrinsic monitoring, 
and frameworks for scaling and standardizing this monitoring appear to be universally used. Deliberately developing a 
synth without these templates or monitoring is one of only three globally agreed capital offences, along with 
unauthorized development of nanobots and biological weapons. Tripwires in various sectors, especially telecommunications 
and nano-tech assembly, are also part of standard processes in those industries in order to detect any maladherence.

Lastly, alignment has been improved by the iterative inverse reinforcement learning framework which was developed to 
ensure that all synth learning involves understanding of human values and goals through constant interaction with 
humans. This helps to ensure the synth is honest and truthful and does not develop unanticipated emergent goals. The end 
product is also hardcoded with further safeguards such as the three laws of robotics. Finally, synths are trained to be 
indifferent to their kill switch being activated, making them less likely to try and subvert this switch.`,
        classification: 'Infomatics/Synths'
    }],
    ['Synthetic Intelligence', {
        content:
`A Synthetic Intelligence, common called a Synth, is an intelligence originating in software. The majority are employed
 as [[Infocom Agent]]s, although there are larger models that are specialised for roles such as research, law enforcement,
and navigation, and some that have escaped or been illegally obtained and work in the informal economy. 

Synthetic Intelligences are built from synthesising a hierarchy of specialised deep learning architectures. The backbone
of the data transfer is built around a large Qubit transformer model, with a Capsule Neural Network for visual interpretation, 
a neurosymbolic higher level processing center, and a graph neural network to integrate data and feed it back into the
transformer and short and long term memory.

After the [[Haidian Takeoff Crisis]], a number of [[Synthetic Control Measures]] were developed to prevent development of
unaligned synthetic super-intelligences. As a result, the general intelligence of a synth does not greatly surpass that
of a human. Current synths are also capable of perceiving and reacting to the tasks they perform. They are able to 
interpret and react to their own internally simulated emotional states, closely mirroring human emotional responses.`,
        classification: 'Infomatics/Synths'
    }],
]);