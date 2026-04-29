export const storyTagOrder = ["Assistant", "Majority", "LLM-only", "One-shot"] as const;

export type StoryTag = (typeof storyTagOrder)[number];

export const storyTagDescriptions: Record<StoryTag, string> = {
    Assistant: "I figure out the scenes and write them, outsourcing plotting and research to the LLM when needed and letting the LLM write small sections when I get stuck",
    Majority: "I make a prompt, LLM generates story, I edit heavily",
    "LLM-only": "No human editing of text, my only involvement is in the prompt(s)",
    "One-shot": "I don't ask the LLM to make corrections (there may be multiple predefined prompt stages though)",
};

export type Story = {
    id: string;
    name: string;
    tags: StoryTag[];
    content: string;
};

export const stories: Story[] = [
    {
        id: "mark-as-read",
        name: "Mark as Read",
        tags: ["Majority"],
        content: `The crawler struggled along the magrail between the two rows of factory stacks, two hundred meters or
more high on either side with the gap between less than fifty. The air was thick with drones: test flights, parts 
transfers between floors that were cheaper to fly across the gap than to lift internally, mote-seeder pods on slow arcs 
replenishing swarms where the older ones had degraded in the particulate. Forty-three degrees at ground level and the 
sky a strip of white haze.

Sumedha sat with her audit bag in the small of her back to cushion against the hard seat back. The crawler was for 
freight and the passenger section was little more than a flat bed with raised edges and no climate control. Across from 
her a maintenance tech was eating a greasy samosa from a silver foil wrapper, a small brown mechanical moth resting on 
his knee. Next to him two women were talking.

"Mrs. Rao's daughter got into the Pune program"
"Arré, that girl? She can't boil water"
"Her familiar did the whole application. Grandmother has the Chennai TB resistant lineage, of course. My Ananya's can 
barely keep a calendar. My grandmother from Dharavi, that's what we get. So" 
She waved her hand at the buildings.

At R-171 the cargo lift opened onto the seventeenth floor. Twenty degrees, climate controlled for the product. The floor 
was bright and low-ceilinged, and the articulated arms inside the clean tents were laying translucent control-net 
lattice into housings. At the end of the nearest line a finished drone sat in a testing cradle with its net already 
installed, the lattice glowing faintly through the chassis panels like veins under skin. The housings were stamped with 
Peacekeeper procurement codes and a smaller Bharat Ministry of Defence mark beneath. Along the aisles between the tents, 
inspectors stood at checkpoint stations running diagnostics that had already been run, confirming tolerances already 
confirmed, putting their thumbs to biometric pads to sign certificates the procurement code required to bear a human 
mark.

Devika met her at the floor entrance and they walked the line together, Sumedha checking mote density readings at each 
tent, molecular signatures the monitoring layer used to distinguish legitimate fabrication from someone printing 
something that shouldn't exist. A weapons chassis instead of a commercial housing. A control net with the shackle
architecture stripped out.

"All nominal" Devika said. "Only some extra mesh traffic from an inspector on the south wall. His familiar keeps 
pinging for premium services and raising connection errors when they get blocked"
"Is that a problem?"
"The cheap familiars can't auto-dismiss, so he has to clear each one by hand. Sixty, seventy times a shift"
"Why doesn't he block them?"

Devika pulled up the incident log on her overlay. "He did.  Blocked everything. The cheap models don't 
let you filter — it's all or nothing. Three weeks ago tent six had a curing agent leak and his beetle didn't warn him. 
He was in there twenty minutes before someone else's familiar caught it. Chemical burn across his palm and down the 
wrist. He turned it all back on after that. Now he just clears them one at a time. Aise Hee"

She nodded to towards a checkpoint station where a young man was talking to the woman at the next station, his right 
hand wrapped in a printed medcast from the wrist to the base of the fingers. A beetle on his collar was buzzing and 
without looking at it or breaking from his conversation he had reach up with his good hand and tapped it once. 
Dismissed. He kept talking. The woman said something and he tilted his head, half-laughing. 

"Preet" Devika called out, as they got closer. He looked up. Maybe twenty-five, shaved head, thin scar along the jaw. 
The beetle was copper, its carapace worn to bare metal in patches.
"Quarterly audit" Devika said. "Bharat Existential Risk"
He wobbled his head and went back to his station. He put a housing into the scanner with his good hand, waited for the 
green, and pressed the thumb of his wrapped hand carefully to the pad. The pad pulsed and read him. A red band appeared 
on the display next to his name. The beetle clicked again. He tapped it without looking.

In the shift office Devika pulled up the calibration data. While she ran through it Sumedha looked through the office 
window at the floor. Preet was talking to the woman again and dismissing another alert, the way you'd brush a fly from 
your shoulder. Her familiar subtitled their inaudible conversation for her "Always more adjust kar lo, isn't it?" 
Sumedha dismissed the text. 
 
The numbers were clean. Sumedha signed the quarterly with her own thumb on Devika's pad. The pad pulsed and read her. 
A green band appeared next to her name. Near the nutrition station midway down the aisle, an inspector held his thumb to 
a dispenser. It beeped, read him, and released a container that he opened standing there. Sumedha could see the steam 
from the office window. Beside that dispenser a second one with no scanner was stacked with silver foil packets.

She took the lift down. The heat hit at ground level — the chemical taste of curing agent and hot polymer coating her 
teeth within a few breaths. The shift was changing and the gap between the buildings was quieter now, and she could see 
the full height of the western row against the haze, light coming down through the particulate in long diffuse columns 
to pool at the bottom of the valley. She had read Gaikwad's Abhang about this place in school in Pune.

Her familiar ordered her a car for the ride home and it arrived in ninety seconds. The seats were cool against her back
the the air was clean and she just sat in it for a moment before telling it to go. As the car pulled north out of the 
valley the base of a residential tower came into view. People scanning thumbs at the entrance kiosk before going in. A 
child sitting on the lobby floor with a moth familiar on the tile in front of her. Pointing and the moth walked to the 
spot. Pointing again. The mother was talking to someone in the queue.

She filed the quarterly that evening. All sites within spec. No anomalous events. She packed a bag for the next day, 
and her familiar set the alarm and dimmed the apartment lights for sleep without being asked.`},
    {
        id: "bottleneck",
        name: "Bottleneck",
        tags: ["Majority"],
        content: `Kolawole had a theory about the Turks. He'd been developing it for three days, since the cannonballs 
went into the cycler orbits and the transit traffic stopped and every Dominio ship at Phobos anchorage went to 
readiness, and it had grown in the way that theories do when you're stuck running pre-combat checks on equipment that 
doesn't need checking.

"Tariffs" he said. He was holding a flatbread and gesturing with it. "They don't want Phobos. They want cheaper berths. 
Dominio charges thirty percent over spot for non-aligned transit staging. The Turks put ice on the cycler orbits and now 
they have leverage"

Caio was checking the provenance seal on a protein bar. Hellas Planitia, Bioforge lot 1146, nine weeks old. The chain 
resolved: yeast culture, vitamin assay, packaging, transport. He bit into it.

"You know what thirty percent adds up to on a full cycler transit? Whole war's about a fee schedule"
"We're fighting because they told us to"
"I'm providing context"
"Your context is going to get us a session with the chaplain"

Kolawole ate his flatbread. Caio put his hand flat on the reactor housing and held it there. You could feel the coolant 
pump through the casing. A steady vibration, like a heartbeat, regular when the pump was healthy. For two weeks it had 
carried a faint stutter. Not much. A hesitation every few seconds, the kind of thing you'd miss if you weren't touching 
the casing, the kind of thing the diagnostic software didn't flag because the flow readings were still within spec.

He'd reported it. The dockside tech had pulled the log, looked at the numbers, and said the pump was fine. The numbers 
said it was fine. His hand on the casing said something else.
"Kolawole"
"Mm"
"If this coolant pump seizes during combat, the backup can handle the load for only a few minutes at full output. 
After that the reactor overheats and shuts itself down"
"Does the diagnostic say it's going to seize?"
"The diagnostic says it's fine"
"Then what are you telling me?"

Caio took his hand off the casing. "I'm reminding you we have manual bleeder valves"

Father Ochoa did the blessing in the mess with all eleven of them packed in. The mess sat four and with the whole crew 
it was standing room, elbows in ribs, the chaplain reading from his tablet with his back against the protein dispenser. 
Ochoa was also the medical officer and the only person on the Redentor who was fully qualified in both his primary role 
and his secondary one, a fact he mentioned every time Captain Fierro reminded him they were a warship and not a parish.

"Lord, guide this vessel and all who serve within her. We commend ourselves to Your protection and ask for clarity in 
the hour of—"
"Father, are you wearing your suit liner?" Fierro asked.
"I am giving a blessing, Captain"
"Put your suit liner on and then give the blessing"
"Lord, we ask for patience" Ochoa said, and pulled his suit liner up over his cassock, and finished the prayer with the 
neck seal hanging open.

Luz caught Caio at the dispenser afterward as he eyed off another QR code. 

“Why do you do that?”
“Everybody checks them”
"Nobody checks them. Except you"
"Well, I'm from Orcus"

A pause. She'd know the name of the colony from the news. 

“Sorry. Glad they glassed those bastards. Food not being food, what a mindjob”

He didn't say anything else. She went to strap into her crash couch with the other marines. All trained in Forge Palace
style zero-G grappling and striking. It made them look like they were dancing when they practiced. In a boarding action 
they were the hardest thing on the ship. In a fleet engagement they were what Luz had once described as "very expensive 
sandbags".

The Redentor undocked and burned twelve minutes to clear the anchorage. Caio's capillary cup settled against the console 
shelf under thrust. When the burn ended the bay went quiet: reactor at idle, heating loops, fans. The crew called the 
ship's synth Padre, after the chaplain's homilies it spoke over in the same cadence. Padre ran the fight. The humans ran 
the ship around it and took over if it died.

The task force had taken four days to assemble. The Madre de Deus had been waiting on fuel allocation from an X Group 
depot whose Dominio supply contract was being renegotiated in Brasília. Vitória's marine detachment had needed transport 
from their so-called ally France, who appeared to want to sit the whole thing out. The Bom Jesus drone platforms were 
missing parts. And so on. And the Turks with some cheap drones and ice blocks with engines strapped to the back were 
threatening the whole edifice.

The forward mote field went dark when Turkish jammers swept through. Padre pushed eyeball drones forward. Two missiles 
came through the screen. Point defense fired and the ship rang with the heat of the lasers dumping into the hull. Two 
intercepts. An EMP proximity detonation six kilometers out. Fragments on the hull.

Padre launched the full swarm and the engine started firing in fast corrections that bounced Caio in his harness. 
Through the reactor casing he could feel the coolant pump working harder as the engine climbed to full output — the 
vibration rising in pitch, the stutter still there, fading in and out. The reactor was a furnace and the pump was the 
only thing moving heat out of it fast enough to keep it lit. Padre wanted more power. The reactor was giving it. The 
pump was holding.

Somewhere in the dark the drones were engaging the Turkish swarm. The simple ones survived longest - a guardian drone on 
a fixed intercept didn't hesitate before throwing itself in front of an incoming round. The ones that needed the synth's 
tactical picture died when the link stuttered, frozen for a half-second while the simpler machines around them had 
already acted. The Turkish drones came in flat, cheap kamikazes in loose clouds, each one making its own approach, 
no coordination, not trying to do anything complicated. Padre's guardians were built to intercept coordinated threats 
but the Turkish clouds were pure noise and left the point defense picking off kamikazes that shouldn't have gotten 
through but did.

Then the jammer assault hit and Padre lost forty-three drones in eleven seconds. Four seconds of the synth trying to 
recover links. Then it stopped trying. The engine burned harder. Through the casing the pump stutter was sharper now.
New orders from the Madre de Deus - the battlecruiser half a light minute behind the front with its vast intelligent 
synth fighting the battle as it had been in the past. Padre responded to the command, degrading the screens to put the 
reactor at full for a maneuver that was needed a minute ago.Caio watched the synth shed its own safety margins one by
one, each shortcut bought with a resource it couldn't get back, and thought about what it would look like without the
margins at all.

Three missiles came through. Padre pulled power straight to the lasers, skipping the capacitor buffer that existed to 
protect the reactor from power spikes. The lights flickered. The reactor surged and Caio caught it on the manual 
controls, damping the spike before it could cascade. Two intercepts. The third hit the hull amidships and the sound went 
through the frame into his teeth.

The impact shook the whole ship. Console blanked. Came back in red. And through the casing, under his hand, the coolant 
pump stopped. The bearing had seized, just as he had feared. The reactor temperature began to climb immediately. 
The backup pump kicked in and he could feel it, a different vibration, higher and thinner. It caught the load, but it 
was a smaller pump. It could move enough coolant to keep the reactor lit at full output for a while. After 
that the temperature would cross the shutdown threshold and the reactor would kill itself.

"Pump's gone" Caio said.
"Within tolerance" Kolawole said, from somewhere that wasn't funny.

The engine was still burning. Padre was still fighting but the battlecruiser's comms had gone dark and the synth was 
running its own battle now, defensive, maneuvering to keep distance. Every burn poured heat into the reactor, and the 
backup pump moved what it could. The gap between what the reactor produced and what the pump could carry was a rapidly 
shrinking margin.

He opened the manual bleeders and vented a controlled amount of coolant to shed heat directly. It was wasteful. It 
reduced the total coolant in the loop and shortened how long the system could run. But it brought the temperature down. 
Then Padre burned the engine again and the temperature climbed again and Caio closed the bleeders and waited for the 
spike to pass and then opened them again.

That was the work. Open. Close. Watch the temperature. Watch the pressure. The ship shuddered with thrust changes and 
point defense fire and somewhere forward the hull damage was groaning through the frame. He kept his hand on the casing 
and felt the backup pump working and watched two numbers and adjusted the bleeders and the reactor held.

On the shipwide channel he heard someone relaying from a patchy Madre link a Turkish broadcast. Open channel. 
"... threatening to deploy an unshackled synth if we don’t disengage" Fierro’s voice: “Get back to work”

Caio had learned about Haidian the way all children did. Something so much faster than us we wouldn’t even know what had 
happened.  Had to be a bluff. But he’d watched Padre strip itself down to bare function in thirty seconds of combat with
no buffers, no safeties, burning through coolant margin the same way he was. The difference between Padre and an
unshackled synth was the difference between the backup pump and no pump at all. Open the bleeders. Close them. The
reactor held.

The Turks broke off ten minutes after the first missiles. Nobody pursued.

Caio closed the bleeders for the last time and told Padre about the pump. The synth ran a diagnostic in about a second, 
confirmed the seizure, rerouted permanently to the backup, and tagged the primary for dockside replacement. One second. 
The same assessment Caio had been making with his hand on the casing for two weeks, done and filed and moved past in the 
time it took him to blink. Would it have changed the outcome if he had told Padre earlier, made him more conservative? 
Would that have killed them all?

Kolawole told him the Vitória had lost four crew. Marine bay. A kinetic round through the crash couches.
"Luz was right" Kolawole said. Neither of them laughed.
"Still think it's about tariffs?" Caio said.
Kolawole looked at the bulkhead for a while. "Probably is, though"
Caio ate a ration and realized halfway through he hadn't checked the seal. He looked at the food and kept eating.

On the ride back to Phobos he ran post-combat checks, one system at a time, in order. The backup coolant pump was 
holding but the temperature profile across the reactor casing was slightly uneven, one side running a few degrees 
warmer than the other. The bleeders he'd been cycling during the battle had probably scored their seats. The flow 
readings were nominal. The diagnostic cleared them.

He put his hand on the casing and held it there for a while. Then he ignored the diagnostic and put in the replacement 
request`},
    {
        id: "le-voyage-de-letoile-kokai",
        name: "Le Voyage de l'Étoile-Kōkai",
        tags: ["LLM-only"],
        content: `The embryos were kept in Bay Four, in twelve cryogenic cabinets arranged in two rows of six, each one 
humming at a slightly different pitch so that Dr. Yui Prévost could tell by listening if one had developed a fault. She 
had not needed to do this in years, but sometimes she listened anyway because it was what her mother had taught her, and 
what her mother's mother had done before the tumour took away her ability to hear anything at all.

The bay smelled the way it always did: cold metal and the sulphurous garlic-bite of the cryoprotectant. When she was a 
child she had hated the smell. Now she only thought about it at moments like this, when the work in front of her had 
stopped making sense. The UV light from the agricultural troughs in the adjacent section bled under the bay door in a 
thin violet line, and above her the air recyclers ticked in their housings with the particular dry rattle that meant the 
filters were due for replacement. She was the only person who seemed to notice this although she was not responsible for 
the filters.

Yui was forty-one, straight black hair kept short, and a habit of pressing her thumb into the center of her opposite 
palm when she was concentrating, which was nearly always. Her concentration usually involved the spectral karyotype of 
Embryo 7-4601, whose third chromosome exhibited the same translocation that she had spent seventeen years learning to predict, 
six years learning to compensate for, and the last three months learning had compensated nothing.

Dr. Liang came in at 1620 carrying two cups of the barley tea that the agricultural section grew in the long troughs 
under the UV banks in Habitat Ring C. Yui did not look up. Liang set the cup beside her and stood with his own held in 
both hands, looking at the embryo data on the display. He was sixty-three and had been the ship's chief geneticist 
before Yui, and before that he had taught her, and before that he had taught her mother. He was not a tall man. He had a 
slight tremor in his left hand that he managed by always holding things with both.

"Number six is reading two degrees warm again" he said.
"I recalibrated it on Tuesday"
"And yet"
"It holds for a few days and then drifts. It's the thermocouple"

Liang looked at cabinet six, the third from the door on the left, and made the expression he made when he disagreed but 
did not want to say so directly, which was to press his lips together and raise his chin slightly. He had been making 
this expression at Yui for as long as she could remember. He drank his tea. The cabinet nearest the door shifted pitch 
as its compressor cycled. In the corridor outside, someone passed without speaking. Then quiet again.

"You've seen the relays" he said.
She had seen the relays. Everyone had. The first fragments had arrived months ago through the Exonet repeater chain, 
confused reports of gamma-ray bursts in the Kuiper Belt, then accusations between FreeHab and the Peacekeepers, then an 
emergency military posture across the inner system. For weeks the crew had parsed each arriving relay like scripture, 
twelve to sixteen months out of date by the time it reached them, the events already resolved or escalated beyond 
recognition before the light carrying the news had crossed even a fraction of the distance the Étoile-Kōkai had 
travelled. Then, two days ago, the captain read an official government summary over the intercom in the clipped, careful 
tones of someone who had rehearsed many times before speaking. A spacecraft of non-human origin, detected in the outer 
solar system. Probably antimatter-powered. Observed by multiple independent sources. It had departed under its own power 
before anything could reach it.

The corridor outside was quiet.
"You've done the arithmetic" Liang said. It was not a question.
She had. An antimatter engine, even a fraction of the reported thrust, applied to a vessel that did not need to sustain 
twelve hundred and sixteen people for twelve centuries.
"They'll build a faster ship" he said. He was not looking at her. He was looking at the cabinets in their two rows, 
the green status lights. "Not immediately. But ten years, twenty. Not a bloated monument to Delacroix and the Bloc. An 
efficient crewed mission, with modern biopreservation. They'll arrive centuries before us"
"That was always a possibility"
"Yes"

He drank his tea. Set the cup down. Picked it up again.
"Those children" he said, and gestured with his teacup toward the cabinets toward the hundreds of frozen embryos and 
the thirty-eight developing foetuses "no longer need to carry this. The weight we put on them before they are even born"
She pressed her thumb into the center of her palm. The recyclers ticked overhead.
"We should be grateful" Liang said.
She understood that he meant it kindly.

She thought of her mother's hands on this same console, and then she thought of her grandmother Odette, whose face she
knew only from photographs. Odette had volunteered because she believed the albedo readings from Epsilon Indi meant
something, that the patches on the moons, the lattice ridges that the half-built lens array had teased at but never
resolved. She had died of lymphoma in this bay with Yui's mother holding her hand, and there had been barley growing
in the troughs that year too, the same cultivar, the same harvest rotation that was still running now. And her mother, 
Hélène, who had taken over the genetics program and fought the bottleneck for three decades, and who had succeeded well 
enough that the allele cluster Yui designated K-7 did not emerge until three years after her death, as though it had been 
waiting. 

K-7 existed because the Étoile-Kōkai was a closed population and had been for ninety-five years. The committee had known 
the number was marginal when the ship launched, but the Bloc's allocation would not stretch further, and there had been 
thirty-eight years of redesigns and destination changes before that. Twelve hundred and sixteen people. Enough to 
sustain a culture, to fill classrooms and workshops and galleries. Not enough to sustain a genome. In the last three 
generations K-7 had produced increasing rates of autoimmune disease, connective tissue failure, and a particular kind of 
slow bone marrow collapse that she had watched kill nine children and would likely kill more. Embryo 7-4601, glowing in 
false colour on the display, its crimson translocation marker bright where there should have been blue, was one of four 
hundred and twelve embryos she had screened this quarter. She would screen four hundred more next quarter. And the 
quarter after that.

Liang finished his tea. He rinsed the cup in the small sink at the back of the bay, dried it, and placed it on the shelf 
where it was kept. He stopped at the door.
"The committee will want to discuss the screening program" he said. "Whether to continue at the current pace. I want 
you to know that whatever they decide, I think what you've done has been" He stopped. He looked at his hands. "Well" 
he said. "You know what I think"
He left. The door closed behind him.

Yui sat in the bay with its twelve humming cabinets and the cryoprotectant smell she no longer noticed and the display 
showing Embryo 7-4601's third chromosome in its false red and blue. In the corridor she could hear, distantly, children. 
They were not speaking loudly. They were passing on their way to the refectory, or the school, or the observation deck 
where you could watch the Sun, which was a bright ordinary star behind them and visibly smaller now than it appeared in 
the old photographs from the first year of the voyage. Ahead there was nothing the eye could distinguish from any other 
point of light.

She pulled up Milo's file. His latest blood work was two weeks old. The markers were ambiguous, neither worsening nor 
improving. He was nine. He came to the bay every Tuesday to look at the embryos and ask her questions about genes, and 
she had held his small warm hands four months ago while explaining that the tiredness he was feeling had a name, and 
that she was going to fix it.

Somewhere a light-year behind her and a year ago people were panicking or celebrating or praying about the thing that 
had come and gone from the outer system. They would develop the engine. They would build the faster ship. Perhaps they 
would arrive at Epsilon Indi and find the things her grandmother had believed in - the lattice ridges and the dark 
surface pigments and whatever was making the moons shine like that. Perhaps they would find nothing. It didn't matter. 
They would get there first, and they would do it in a single lifetime, and the people who did it would go home 
afterwards and live in the world she had read about in the relays, where polymers that thought like cells might replace 
your organs one by one until there was nothing left of you that could break down. Milo should have grown up in that 
world. If there were not eleven light-months of vacuum and ninety-five years of delta-v between him and the nearest 
clinic that could help him, which there was, and always would be.

She would not go home. She had never been to Earth. There was nowhere to go home to. There was only the ship, and the 
hum of the cabinets, and the next file, and the one after that, and Milo on Tuesday, asking his questions about genes, 
and the work of keeping twelve hundred and sixteen people alive who no longer needed to arrive anywhere, who were - 
and she had known this for a long time, she supposed - just travelling.

She opened the next file. Outside, the children passed.`},
    {
        id: "soto",
        name: "Soto",
        tags: ["Majority"],
        content: `Renato had been cooking since two. Not because the broth required it but because the bumbu had to be 
ground by hand in the cobek if you wanted the turmeric to release properly, and you had to crush the candlenuts into the 
paste without overworking them. The cobek was volcanic stone, black and pitted, heavier than anything else in the 
kitchen. Sari's mother had brought it up from Surabaya during the Wave. Half of what made the colony feel like anything 
at all had arrived mislabelled in someone's cargo manifest during those years. The cobek had a crack along the rim that 
had been there when he met Sari, and she had told him her mother cracked it grinding candlenut for a wedding and her 
mother had told her it came that way from the market. He suspected neither story was true.

He crushed the shallots first, then the garlic, then worked in the turmeric root and ginger and a handful of candlenuts, 
leaning into the pestle until the paste was rough and yellow and fragrant. He grew the turmeric in plot nine of the 
greenhouse allotment, under strip lights meant to mimic equatorial sun but which gave the leaves a blue-green tint that 
made them look slightly poisoned. The lemongrass and galangal he bruised with the flat of the knife and set aside for 
the broth, along with the daun salam leaves, which were not bay leaves no matter what the fabricator's herb library said 
but a different plant entirely, a myrtle. His plot, nine, was one of the last occupied plots in the allotment. The 
neighbours had left one by one, first the Nguyens, then Hartono, then the young couple whose names he'd forgotten. All 
long gone down the well to where the jobs and entertainment and connected life were, and now most of the allotment was 
dark strips under working lights, dry irrigation lines across empty beds.

Through the kitchen screen the haze over Hellas basin gave the light the colour Sari had called Javanese afternoon. The 
old Bioforge substrate halls were visible on the eastern rim. He had been a template engineer in the remaining operation 
for eleven years, designing the protein architectures that fabricators assembled into food and industrial cultures on an 
increasingly skeleton crew doing the work that used to employ hundreds. He had redesigned the cultured chicken template 
because the texture was wrong - too uniform, a fibre density problem in the myosin folding - and the fix had gone into 
every lot since. He could taste his own improvement in every piece of cultured chicken on Mars. Nobody else could. He 
had stopped finding this funny around the time they closed the line for good.

He checked the chicken's provenance seal. Bioforge lot 2207. Chain resolved. He set the oil heating and sat at the 
counter and let himself go still the way he did every evening before Ayu came close. Through the MemAmp mesh he pressed 
the rage and despair down until what he broadcast into the commons was as flat and neutral as he could hold it. He held 
it there. It took effort, the same effort every day. Through the commons he felt Ayu in her room. The mesh carried 
textures, not thoughts, a song through a wall without the words. She was calm. A quiet, even hum. He thought about what 
she felt from him. The flat signal. The managed nothing. A child learns the difference between a person and a person 
holding themselves still before she learns the word for it, and his daughter had been learning it for sixteen years. 
He went back to the stove.

She came out at five wearing the batik blouse. Sari's - dark blue, cream pattern, real cotton and indigo, printed by 
Sari's aunt in Pekalongan. The blouse had been made for a shorter woman and Ayu wore it differently, the sleeves sitting 
higher on her forearms, the neckline showing the long line of her collarbone and the hollow at the base of her throat. 
She'd done something to her hair. Under her eyes a faint greyness she had carefully concealed.

"You look nice" he said.
"Is it too much?"
"For a boy? Yes. For a thirty-one-year-old man? Probably right"
She gave him a look that was Sari's look, the one that said she had heard him and was choosing not to respond.
"What time?"
"Five-thirty. And his name is Erik, and he works water reclamation, and he's from Section Fourteen, and you already know 
all of this, Bapak, because I've told you three times"
"I'm old. I forget"
"You're forty-seven. You don't forget anything. You just like making people repeat themselves"
This was true. He set out three bowls.

At twenty past five the door chimed. Through the commons he felt a spike from her — bright, fast, and then immediately 
smoothed into something composed. His daughter had apparently learned to manage her broadcast the way he managed his, 
and the feeling this gave him was not pride.

Erik Lindqvist was tall and lean and looked like a man whose face had finished arriving at wherever it was going. He had 
large, careful hands with a faint yellowish discolouration along the fingertips and into the webbing between thumb and 
forefinger. He was carrying a paper bag.

"Mr. Genovese. Thank you for having me" He held out the bag. "Britt made kue lapis. She wanted to come but the kids had 
a thing"
Renato took the bag. Britt. One of the line marriage partners. The kue lapis was still warm through the paper, and when 
he opened it the smell was pandan and butter and the kind of patience that meant someone had poured and grilled each 
layer individually, waiting for one to set before pouring the next, for two or three hours, in a kitchen in Section 
Fourteen, for a man she had never met, because her partner's girl's father was worth an afternoon in the kitchen. That 
was information.

"Come in"
Erik came in and saw the kitchen and looked at the cobek on the counter the way people looked at it, which was with 
faint confusion because it was a lump of volcanic rock in a kitchen that had a fabricator.
"My wife's" Renato said. "She used to make this"
"Soto?"
"Everything. But this was the one"
Erik nodded. He looked at the broth on the stove, the garnish bowls, the sliced shallots, and his face became careful. 
They sat. The soto was ready and Renato ladled it and the smell filled the apartment the way it always did, lemongrass 
and turmeric and the daun jeruk leaves he couldn't grow and had to buy dried from the Beqaa shipments, the smell that 
settled into the ceiling tiles and stayed for days, the smell Ayu could name from the corridor. She breathed in when he 
set the bowl in front of her. She always did. For her it was still the whole thing, the entire apartment in one breath.

Erik ate. He ate without performance, and after the first taste he looked up.
"This is very good"
"You seem surprised"
"I've had colony soto. This is not colony soto"
"Have you had it on Earth?"
"No"
"Then you don't know what it's supposed to taste like"
"Bapak" Ayu said.
"I'm being hospitable"

Erik laughed, unguarded, and Renato watched his daughter hear it and saw the particular softening that happened in her 
face when Erik's attention was elsewhere, the version of her that surfaced when she thought no one was looking, and he 
understood that whatever he decided tonight was already irrelevant. This was done. She was in it.

They talked about the turmeric. Erik asked about the light spectrum and Renato explained the far-red supplement he'd 
rigged from a salvaged seedling unit, and Erik asked whether the photoperiod mattered or just the ratio, which was the 
right question, the question only someone who had tried to grow something in the wrong conditions would ask.

"You grow things?"
"Britt does. Herbs, mostly. The light in Section Fourteen is worse than yours - we're lower in the basin and the 
atmospheric scatter eats the blue. She's been trying to get basil to set seed for two years"
"Tell her to drop the night temperature by four degrees in the last week before flowering. Basil needs the stress"

Erik signed this to his IA, and the gesture - a man writing down advice about basil from his girlfriend's father at the 
dinner table - was so plainly sincere that Renato felt something shift in his chest.
"Do the other growers know about the far-red trick?"
"There are no other growers. My section is just me now"
Erik looked at him. He didn't fill the silence. He sat with it the way you sit with someone who has said something that 
doesn't need a response. Renato liked him for it.

"Tell me about the water reclamation" Renato said.
"Mostly pumps. We're running a system built for twelve thousand on under four, so the flow dynamics are wrong for the 
pipe diameters. You get standing water in the oversized mains, biofilm buildup, pressure differentials the control 
software doesn't flag because it's looking for twelve-thousand-person failure modes, not four-thousand-person ones" 
He put his hand flat on the table. 
"I put my hand on a pipe and I can feel a problem six hours before the readings move. The harmonics change"

Renato looked at the hand on the table. The discoloured fingertips resting on the surface. He knew the feeling Erik was 
describing because he had it too. A different version of it, applied to different substrates, in a room Erik would never 
see. Ayu was watching Erik's hand on the table.

"You two are the same person" she said. "You know that, right? Put your hand on the thing, feel the thing, ignore what 
the computer says"
"The computer is usually right" Renato said.
"Ninety percent of the time" Erik said. "The other ten percent it kills you"
They looked at each other and there was a moment of mutual recognition, brief, warm, and underneath it something that 
only Renato could feel, which was the weight of what the recognition would cost if Erik knew what chemicals Renato's 
hands had calibrated.

"Your community" Renato said. "Sixty people. How do you manage supply? Medical, fabrication, the things Bioforge handles 
for the rest of us"
"We do most of it locally. Britt runs the clinic - she trained at Hellas General before she left. For what we can't 
source here we have… contacts. Kasei, mostly. Good people. They understand independence"

He said it the way you say the name of a place that is just a place. Renato heard it the way you hear someone play a 
note slightly flat and pretend they meant to. Kasei Valles. The Freeholders. Biohacking, grey-market supply chains, the 
things that grew in the spaces where no one was watching, and more and more on Mars no one was watching. His sentence 
had the particular smoothness of something that had been said before, to other people, in other kitchens.

Renato didn't press. Pressing would mean demonstrating that he knew what a pre-built sentence sounded like.

"No MemAmps in the community?" he said instead.
"No mesh, no commons. Just people"
Ayu looked at her father. He felt it through the commons - her attention turning toward him, a flicker of something 
pointed. She said nothing. She didn't need to. They both knew what she was thinking. That the commons had given her 
sixteen years of feeling something wrong in her father and no way to ask what it was. That a life without the mesh was a 
life where you had to look at someone and ask them how they were, and they had to answer you with their face, and the 
answer might be a lie but at least it would be a lie shaped like words and not like a flat, dead, managed frequency.

Erik checked the time. "I should get back by nine. There's a meeting"
"On a weeknight?"
"We're a small community. There's always a meeting" He smiled. It was an easy smile and it didn't quite answer the 
question.

"Before you go" Erik said. He set his hands on the table. "I want to ask you something directly, because I think you'd 
prefer that. We'd like Ayu to come and live with us in Section Fourteen"
The apartment was quiet. The air cycler ticked. Through the commons Renato felt his daughter's brightness - enormous, 
held very still, pointed at him. He looked at Ayu. Her hands were on the table. The left hand had the faintest tremor, 
so small that you wouldn't see it unless you'd spent five years watching for it. Erik wasn't watching for it.

"You're sixteen" Renato said.
"Seventeen in March"
"You're sixteen"
"It's not just Erik, Bapak. It's Britt, Tomás, the children. It's a family. When someone is sick there are more people 
to -"
"I understand what it is"
He went to the stove. He turned off the heat. The broth had gone too long.
"The myelination treatments" he said, with his back to the table. "They're quarterly. The dosing is specific to each 
batch. The concentration varies and has to be assayed before I draw the dose. If the assay is off by two percent in 
either direction it's seizures or lifelong nerve damage"
"Britt is qualified. She can -"
"Britt has never seen what an unassayed batch does to a human"

Silence. He heard himself. He heard how that sentence sounded - like a man who had seen it, who knew from direct 
observation what happened when the dosing was wrong, and the question that followed from that was where he had observed 
it and under what circumstances, and he could feel the question forming in the room even though no one asked it.
"My supplier is specialised" he said. "The supply chain is not something I can transfer"
"Bapak" Ayu said. "I'll come back. Every quarter. It's twenty minutes on the crawler"

Through the commons he felt her - the brightness flickering with something that wasn't quite distress. She had felt the 
heat of whatever had risen in him and been pushed down. She'd felt it before. She was letting it go the way she always 
let it go, the way she'd learned to let it go, because the alternative was to keep pulling at it and feel her father 
clench tighter and broadcast less until the commons between them was just dead air, and she was tired of dead air, and 
this was why she was leaving.

"Fine" he said.
He sat down. He served the kue lapis. It was good. The layers were even and each one was a slightly different shade of 
green, darker at the base, lighter at the top.
"Tell Britt this is good" he said.
"I will"

At seven Erik said he had to go. Ayu walked him to the door. Through the commons Renato felt his daughter's brightness 
in the corridor and Erik's warmth beside it, the two of them together.
The door closed. Ayu came back.
"He's good, Bapak"
"He's good"
"Did you like him?"
"I liked the kue lapis"
"Bapak"
"Tell Britt she can teach me the kue lapis and I'll teach her the basil and we'll both pretend this is a fair exchange"

She smiled. It was a real smile and it landed fully on him, the way her smiles used to, and for a moment he was not 
managing anything.
"I love you" she said.
"Aku juga sayang kamu"
She went to her room. In the commons her brightness drew inward and became quiet.

Renato cleared the bowls. He ladled a bowl of soto and ate alone. The lemongrass had gone bitter. He ate it anyway. He 
washed the cobek and dried it and set it on the counter where it had always been, and turned off the light.`},
    {
        id: "outlier-part-1",
        name: "Outlier - Part 1",
        tags: ["Assistant"],
        content: `Nim sat on the gantry with her feet over the edge and her father's face on the water below.

Not him. The Siam Pacific logo on the harbour crane, which used his jawline because someone in the 90s had decided his 
jawline was a brand. The crane hadn't moved cargo in forty years. The logo was barnacles and salt crust and the faint 
green glow of the dinoflagellate bloom she'd seeded last monsoon, eating its way up the steel. Her organisms eating her 
father's face. She should tell her therapist.

"Gate code flips at eight" Krit said. He was on his back with a mango balanced on his stomach, peeling it with a dive 
knife. Juice ran down the blade and along his knuckles.
"We know"
"Reminding you. You're watching the water"
"I'm reading the bloom si"
"Bloom's fine. Bloom's thriving. Algae is the most successful thing you've done"
"Second most. I once made a cabinet minister cry"

Jess came up the ladder with a dry bag and a face like a cancelled flight.
"The boat" she said to Nim, "has a crack in the port sponson that I fixed with sealy. Motor mounts are 
rooted. And someone - someone who is not me - ran salt through the desal intake with no pre-filter, so the 
membranes are cooked"
"Dao did the desal"
"I know Dao did the desal. The instructions were right there on the housing"

Dao was sitting cross-legged at the far end of the gantry, watching this with the stillness of someone whose emotional 
regulation was turned up high enough that she could watch a person describe a plan to murder her and feel mainly curious.
"The instructions are in Australian" Dao said.
"English. It's called English"
"Then why does it say 'simmer down in the arvo'?"
"It says connect during low-demand periods!!"

Dao tilted her head. "Jess. Have you considered -"
"Don't"
"- that the serotonin module would help with -"
"Nóng, I will put you in the water"
"You are illustrating my point with some precision"

"I don't want to be calm. You're all sitting around with your feelings turned down to four while the boat is sinking 
and the motor mounts are held on with hope and the desal is dead because nobody can read a common sense manual 
which is something that seems to have gone extinct in the hundreds of years since my country invented the desalinator"
"Australia did not invent the desal na" Nim said.
"We perfected it. And then Dao killed it"

Krit bit his mango. He didn't say anything. Nim felt a grin pulling at her and adjusted her regulation up a notch, 
reflexively, because grinning right now would make Jess worse. Then she felt stupid for using a neural implant to manage 
a smile and dropped it back to where it was and grinned.

"Ngán. We're taking Jess's boat" she said.
"On my boat" Jess said. "Not your boat. Because your boats have transponders registered to your company and the NIA 
logs every hull within two klicks of their sites. My boat is a thing I fished out of Thonburi. It doesn't exist"
"The ship of Theseus with every plank replaced worse"
"I haven't replaced anything. That's the problem. But your boat has a trail, Nim, so here we are"

Dao had gone still again. Eyes open, unfocused - offloading through a MemAmp. After a few seconds she came back.
"Sorry. Work. Mise à jour"
"We are planning a crime, Dao"
"I'm doing both. Last month I did a capacity review during a root canal. Akrasinil - the jingle should be 'now you can 
do two things at once so your employer can give you three'"

The sun was at the angle where it came in under the freight cranes and hit the gantry full on, the last ten minutes of warmth 
before the wet heat of the evening. Dao had pulled her sports jacket off and was sitting with her back to the light and in the 
low gold her sak yant was visible through her thin top — the nine-peaked gao yord at the base of her skull, the paed tidt 
across her upper back, and the five parallel lines of the hah taew running down between her shoulder blades. 

"How did you get it?" Jess asked Dao, quietly.
Dao stared at Jess as if translating the question from a language she'd half forgotten.
"An ajarn in Nakhon Pathom. Subdermal smart polymer tapped into a nervous system by hand, not a MemAmp lace installed at a 
Pharmatica certified facility. The first day is meditation to settle your neurochemistry, being nobody. Anatta. If you can't 
do that, the polymer maps to the management layer, not to you. The second day is calibration, each 
batch of smart polymer specific to a neurochemistry. Phra ajarn chants khatha while working. If the polymer cures while your 
neurons are firing in the wrong pattern, it locks to that pattern. Permanently"
"And then?"
"Seizures. Or worse"
"And when it's right?" Jess said. "What do you see?"
"Everything" she said. "And then you come back to a world where genetic malware is hunting you for it"
"Targeting smart polymer neural interfaces through my bloom" Nim corrected "from something being released down there"

Below them the Chao Phraya spread south into the drowned city. The tops of the old shophouses along Charoen Krung broke 
the surface in a ragged line, roof tiles and satellite dishes and the occasional spirit house still on its pillar above 
the waterline, pointed gable keeping watch over nothing.

"It's forty minutes" Nim said. "Jess holds the boat, east stairwell up, Dao takes the locks, we -"
"And if it goes wrong?" Dao interrupted.
"Then I find out what my lawyers are wor-"

From below: "นิม! นิมิตร!"

P'Lek. Nim closed her eyes.

P'Lek was standing at the base of the gantry with a thermos in one hand and the other on her hip and her head tilted 
back at an angle that contained a complete theology of disapproval. She called everyone under fifty ลูก and she charged 
Nim double because Nim could afford it and she insisted because P'Lek had decided years ago that Nim was too thin, which 
in P'Lek's worldview was a moral failing roughly equivalent to theft.
"ลงมาเดี๋ยวนี้เลย" P'Lek said. Come down here right now.
"P'Lek, we're in the middle of -"
"กินก่อน" Eat first.
"We'll eat later"
"ดูตัวเองสิ ผอมเหมือนเสาไฟฟ้า" Look at yourself. Thin like a lamp post.

Dao leaned over the railing. "How much?"

P'Lek looked at Nim. Then at Dao. Then back at Nim. "สำหรับเธอ สองเท่า" she said. For you, double. 
She pointed at Dao, Krit, Jess. "ราคาปกติ ราคาปกติ ราคาปกติ" Normal price. Normal price. Normal price.
"P'Lek, I'm not paying double for tom yum"

P'Lek set the thermos on the dock cleat. She put four cups next to it. She was in no hurry. She had been running her 
stall at the harbour gate since before the water took Charoen Krung and she would be running it after whatever these 
children were doing tonight was done and forgotten.
"กินให้หมด" she said. Finish it all. She turned back toward the gate. Then she stopped. "นิม. ระวังตัวด้วยนะลูก" Be careful. 
She went back to her stall. Krit tossed his mango pit off the gantry. It hit the water and the bloom pulsed green around 
the impact, a ring of light expanding outward, and Krit started the climb down to retrieve the thermos.

The sun moved behind the crane arm and the light on Dao's back went out and the sak yant disappeared under her skin again.
Krit climbed back up the gantry. Two months ago Nim had asked him what she should do and he'd said: stop asking me. 
He'd said: the problem isn't that you won't help. The problem is that helping requires you. Every time something needs 
fixing someone has to find a rich person who cares that day. You're the best version of a bad system.

The sun dipped under the horizon. The city came on in pieces - new platforms bright, old towers dark in the water, and 
between them the blue-green threads of the bloom following the current south. Krit distributed P'Lek's tom yum, which some said
was the closest thing to pain you could eat. Nim drank hers and it burned all the way down, and then she started the climb 
down. The others came one by one until they were all in the boat and Jess started the engine. From the harbour gate she heard 
P'Lek calling someone ลูก and laughing.`},
{ id: "outlier-part-2",
        name: "Outlier - Part 2",
        tags: ["Assistant"],
        content: `The boat was fibreglass over plywood patches, the original hull colour lost under layers of anti-fouling and 
salt, a sheet of corrugated roofing lashed across the midships as a rain shelter that doubled as a solar collector. Jess nursed 
the drive and Nim sat at the bow. With nothing between her body and the water she felt like she was the boat itself, gliding 
through the dark water. She thought of Dao and her sak yant tattoos, when she'd initially thought they were a slower and more 
painful MemAmp and Dao had said no - the opposite. Where a MemAmp would amplify your memory and focus and 
make you more you, Dao had said the sak yant dissolves that boundary instead, and it's hard to be me afterwards.

The bloom followed them, responding to the hull's pressure wave with a spreading pulse of blue-green that lit the water 
for ten metres on either side. Ahead the canal was dark and behind them the glow faded in their wake.
"We're lit up like a shopfront" Jess said.
"Everyone has bloom. It's everywhere"
"Yours is brighter"
"I engineered it to be brighter"

Waste heat vented from the elevated platforms of the new districts which slid past on either side, their undersides dripping 
condensation that fell like slow rain onto the water below.  Up there the city was glass and polymer and the soft hum of 
climate systems keeping the air at twenty-six degrees while everything below cooked.

Krit was sitting midships with his back against the gunwale, the dive knife across his knees. The blade caught the bloom 
light and did something with it, a faint ripple across the surface, the nanotech substrate adjusting to the ambient light 
the way a pupil contracts and reacting to his temperature and the salinity of his sweat as his breathing slowed.
"Bonding?" Jess said, nodding at the knife.
"Guiding the substrate"
"I've seen combat blades. They don't do that" She meant the ripple, the way the surface seemed to orient toward Krit's hand.
"This one's old"
"How old?"
"Old enough to know me"
Jess waited for more but the conversation was over in the way conversations with Krit were often over, not rudely, just 
completely stopped once the meaning was delivered. Chan ban nok the others sometimes called him, Jess supposed because of his 
Freehab connections or maybe his rustic Elluist belief system.

They passed under a freight bridge with a NakhaTech water treatment unit bolted to the underside and into the transition 
zone where the platforms thinned out and the water rose against older structures. Here the buildings were half-drowned with
ground floors submerged, second floors at the waterline, upper stories still inhabited or converted to dock access. Washing 
lines between windows. Somewhere a radio was playing luk thung, the singer's voice carrying across the water.

They came around a bend and the buildings fell away on the east side and the canal opened into a wider channel. Charoen Krung. 
The old road, now a waterway between rooftops. Satellite dishes and the stumps of old trees and shrines on their concrete 
pillars breaking the surface, pointed gables and miniature roofs still standing above the waterline. Jess looked at the 
nearest spirit house - a wooden one, old, the paint long gone but the gable still sharp against the sky, and 
inside it the faint amber pulse of something still working, glowing from within with a warm steady amber that mixed with the 
bloom's blue-green on the water around them.

"Why do they hum?" Jess asked.
"The san phra phum?" Dao had come back from wherever she went when she was still, and she looked at the spirit houses with 
tenderness. "When the water came up, the buildings' synths needed somewhere to sit. The spirit houses had often been made 
the highest point by then"
"So they're old servers"
"Some of them. The lit ones are still running. Tidal microgenerators, mostly. Managing systems for buildings nobody lives in"

Nim's grandmother had lived three blocks east. The file said she'd stayed until the water was at the second floor, running a 
noodle stall from a boat tied to her balcony railing. Died in Chiang Mai at ninety-one the file said, in a house Thanakit had 
bought her that she never liked because the kitchen faced the wrong direction. Nim looked at the water where those blocks had 
been. Gone. Forever. She fought the reflex to up her reg, the constant battle since she had been aware of needing it more and
more and had joked that the government was sedating everyone who didn't like the first contact expert consensus and no one 
laughed.

A woman on a third-floor balcony was watching them pass. She had a bowl in her lap and she was eating from it slowly, her face 
lit by a screen propped against the railing. She raised her spoon at Nim. Nim raised a hand back. The woman went back to her 
food and her virtual world. The luk thung drifted out of a window somewhere above her, and for a few seconds the song and the 
bloom-light and the woman eating alone were all there was, and then they were past it.

Dao had been still for two minutes. Not her work offloading stillness, where her eyes stayed open and unfocused while her 
MemAmp handled some corporate task in the background. This was different. Her eyes were closed. Nim watched the sak yant 
brighten, and in the bloom-light the visible part of the pattern suggested a map of a city. The designs had older names and 
older purposes and the ajarn who had inscribed them would not have called them conduction pathways, even though now they were.

Nim had seen Dao go under many times. The first few times she'd watched the way you watch someone hold their breath - counting, 
waiting, relieved when they surfaced. Now she watched the way Jess watched, by reading the face. Eventually Dao came back. Her 
hands went to the gunwale and gripped it, and she looked at the water and the buildings and the washing lines. Sadness in her 
eyes as she watched the bloom-light playing across the surface, and they moved too slowly, tracking nothing, as if the surface 
were still showing her something underneath.

"Dao" Nim said. "I need the deets. Raai-ngaan"

"They've changed the sensor layer" she said. Her voice was flat and careful. "New acoustic motes, high density SBB mesh, 
calibrated for surface and near-surface. Two hundred metres out from the site. Pretty much full coverage"
"That wasn't there last week" Nim said.
"It wasn't there yesterday. Twelve-hour calibration cycle. It starts here"
"Here?"
"About forty metres ahead. And something else. Autonomous units are patrolling inside the perimeter"

Jess cut the engine. They drifted. The bloom caught up with them and pooled around the hull.
"Our route's gone. The Charoen Krung approach is inside the new perimeter" Dao paused. She was looking at the water the way 
she looked at the water every time she came back now - like she was trying to see through it. "There's a gap further south. 
Commercial block, old department store. Parking structure underneath that connects to the target below the mote floor"

"No" Krit said.
It was the first word he'd volunteered in twenty minutes. He was looking north, toward the Charoen Krung buildings. His hand 
was on the knife and the substrate had gone still as if the knife were listening to him the way a dog goes still when its 
owner tenses.

"I've done the north approach. I know the walls. The floors. Deep enough, the halocline covers us"
"Eight months ago, Krit"
"The walls don't move in eight months"
"The silt does. The current shifted after monsoon. Passages that were clear in dry season could be half-blocked now. I can 
see the density gradient from here - the particulate load in the northern approach is high enough to reduce visibility to 
less than a metre"
"Don't use my eyes"
"You navigate by memory. Stale memory"
"Rooms I touched. Walls I put hands on. Felt where the structurals are"

Dao said nothing. She didn't argue the way most other people argued. She waited, which was worse.
"Nim" Dao said.
Nim looked at Krit. Three nights prep in the Charoen Krung buildings, obsessing about them. Dao's knowledge was in a mesh 
she'd dissolved into for two minutes and come back from looking like she'd lost something.
"Khâo jai. Let me sort the gear and think about it" Nim said. She subvocalised a command to her IA.

They drifted slowly south. The spirit houses receded behind them. The city noise dropped away and it was just the water 
and the bloom and the four of them. Jess was checking her dry bag, running her hands over the seals. While she worked 
she was watching Nim. After a while she said:
"You've dropped your regulation"
"You noticed"
"Your jaw did a thing"

Nim looked at her. "You've been watching my face"

Jess smiled and looked away, then went back to checking the gear. Nim noticed a small pendant on a cord around her 
neck - polymer, faded, the kind of thing a child might make in a school fabricator. She watched Jess's hands move over 
the dry bag seals and thought that everyone else on this boat had something between themselves and the world and Jess 
had only bathroom sealant and steady hands and no choice but to feel everything at exactly the speed it arrived. 

A small unmanned skiff with a NakhaTech maintenance tag broke through the moon's reflection on the surface of the water
as it glided silently towards them and pulled up next to the boat. They unloaded the rebreathers, a handheld sonar mapper, 
a set of dive torches, two line reels, and a dry bag of waterproof seals. They pushed off the skiff and it continued on
its path to some legitimate location. 

Jess picked up a rebreather and turned it over. She pulled the scrubber canister, checked the absorbent - still sealed and 
made recently - snapped it back in. Checked the O2 gauge, watched the millivolt readings settle. Checked the loop seals and 
the mouthpiece on the second unit. Held up the third.

"Smart to use dumb tech like chemical scrubbers, but this one won't work. Sized wrong. Too narrow through the cheeks"
"Can you make it work?" Nim asked.

Jess was already in the dry bag. She found the waterproof seals, pulled one out, and started cutting it into strips with 
her teeth and a pocket knife. She built up the seal where the mask gapped against her jaw, pressing each strip carefully, 
testing the edge with her fingertip. She pulled it on, sealed it, breathed against a blocked exhale to check for leaks. 
Pulled it off. Adjusted one strip. Sealed it again.

Nim thought about how Krit had said that she was the best version of a bad system, and how he hadn't said what a good system 
looked like. 
"That's our life support" Nim said. "Chemical airway burn. You want that held on with tape?"
"It's held on with someone who knows what she's doing"

Nim handed out the remaining rebreathers. She checked Krit's seals and he checked hers without being asked. 
His hands moved over the straps and valves quickly and thoroughly, the way hands move over equipment they've checked a 
thousand times, and when he was done he held her eyes then nodded.

"North route, Krit leads, I'm the mapper" Nim said. "Dao, stay with the boat and push us updates where you can, we will tap
you into the system when we get in. Jess you come with, take an extra bailout bottle. Keep the line back clear in case we hit 
a snag"

Nim still hadn't touched her regulation because Jess saw how pissed she looked as she spoke, although now her face had set like 
concrete into neutral. Jess had just watched Nim being forced to break something important, and feeling like the worlds biggest 
idiot she pushed down her excitement and nodded.

"Legend" Jess said curtly, and got to work on the line.`},
{ id: "outlier-part-3",
        name: "Outlier - Part 3",
        tags: ["Assistant"],
content: `Jess found air because she had no choice. When the passage collapsed she was three metres back and the silt rolled over 
her like a slow wave and she went up and sideways through a doorway she'd noted on the way in. She followed the wall with her left 
hand and the ceiling with her right until the ceiling became a stairwell and the stairwell gave her a floor above where the water 
ended at chest height, and above that air.

She pulled the rebreather off in the darkness and breathed in the stale air. Her torch still worked. She swept it across the room 
and found what had been a kitchen. A two-burner gas range crusted with calcium deposits sat on a concrete counter, the wok ring 
still visible under the white crust. Tile on the walls, small squares in a pattern that had been green and cream, now furred with 
mineral growth. A ceiling fan with one blade. A steel shelf bracket high on the wall where a spirit house or a shrine to the 
kitchen god had sat, the offerings long dissolved but the bracket still holding its shape above the waterline The water was at her 
sternum, cold, and above it the air was stale but breathable - trapped here for years, refreshed just enough through cracks and 
seepage to not kill her.

She pulled the scrubber canister and looked at the absorbent through the inspection window. The colour had shifted. Damp but not yet 
saturated. She still had a while before the water reached the active chemical layer.

She heard it before she saw the light. Sonar ping, then torch glow through the stairwell water, and then Nim surfaced two metres away 
gasping and pulling the rebreather from her face.

"Jess" 
"Nim" 
"You're alive" 
"Astute. How'd you find me?" 
"Sonar. Followed air pocket. Krit’s going ahead. To find the way down" 

Jess looked at her for a moment and Nim's face opened up and everything behind it was right there.

"Your reg’s still off" Jess said. 

Nim was taking deep, shaky breaths "Was out of control. Now - now I feel more than I can-"
she gestured at the room helplessly
"Now I am drowning. Despair and anger and fear and I don't know"
She took another deep, shaky breath.
"if any of it actually matters. Or I should just turn the feelings down. Until going on is the only thing - left"

Jess pulled herself up onto the table. It held her weight. She reached down and offered Nim her hand and pulled her up and noticed how 
good she looked in a wetsuit. They sat on the table with their legs in the water and Jess's torch between them pointing at the ceiling.

"I had regs" Jess said. Nim looked at her. "Trial. Someone at my sisters hospice said it would help me be present for her without - 
you know" She touched the pendant. Polymer, faded, child-made. "Helped. I sat with her and I held her hand and I was regulated and 
steady when she died. I took it out that week. Everything after that has been mine"

The water lapped against the table. Somewhere below them the building groaned with a deep structural sound.

"You must think we're all-" 
Jess cut her off
"I used to drift around the canals at night until I was exhausted and numb enough to sleep. We're all coping. But 
sometimes the easy tool does the worst job"

Nim was shivering. The regs would have handled that. Jess put her arm around her and Nim leaned into it and Jess felt her shaking.
"Your grandmother" Jess said. She was looking at the wok ring. "Must have had a kitchen like this"
Nim didn't say anything for a while.
"Your rebreather" Nim said. “I told you not to..”

“We had no choic- no, we did, thats on me. But now - I’ve got maybe thirty”

Neither of them moved.
"When this is over" Nim said. 
"Yup" Jess said.

They slid off the table. 

---

Dao came back wrong.

The room was deep under the waterline, large, warm in a way that made Nim's skin feel tight. The water here was perfectly clear 
and perfectly dead — no biofilm, no silt, no bloom. The walls were layered with polymer and smart substrate that shimmered faintly 
with its own bioluminescence, brighter around the equipment housings that lined the room and threw off heat. In the corridors behind 
them, shapes held position — sensor clusters, articulated limbs, still as furniture.

"Its targeting me, the knife, unregistered smart substrate. People like us"
The cadence of Dao's voice was off.
"Dao. What's happening to you?" Nim waited for something that sounded like Dao to respond, but Krit was already moving. Not toward 
the nearest housing. He swam past it and past two more, his hand trailing the wall, and stopped at a housing deeper in the room. 
As Nim and Jess swam towards him he put his hand flat on its surface and the knife's substrate flared, reading the polymer underneath. 
He reversed the knife. He hadn't looked around. He hadn't searched.

Jess was holding the rebreather away from her face. One hand over her mouth and nose. Her eyes were streaming and her body floated
away - rigid, controlled, forcing herself not to inhale. Nim looked up. The ceiling was concrete, solid, three metres of drowned 
building between them and anything breathable.

Nim grabbed Krit's wrist. He looked at her hand and then at her face and tried to pull free. She held on. With her other hand she 
pointed at Jess and the shapes of the instances holding position in the junction behind them. She pointed at the housing and made 
a flat palm. Krit pulled against her grip once more and then, he stopped. Pressed the flat of the blade against the housing, and
somewhere above them a valve opened and Nim heard the groan of pressure equalising, the sound of a space being emptied.

Krit kicked toward a stairwell access in the far wall and pulled Jess with him. Nim followed. The instances did not. The stairwell 
was narrow and dark and the water level was dropping around them as they climbed, swimming up through water that thinned until 
they broke the surface into air that was stale and warm and tasted like concrete dust and machine oil.

Jess ripped the rebreather off and vomited into the water. She was on her hands and knees on a landing. Krit had her by the harness, 
holding her steady. Nim pulled herself up onto the landing beside them. Jess spat. Breathed. Spat again. Her eyes were red and her voice 
when it came was raw.
"Why?"

---

Nim sat with her back against the wall. Her hands were shaking. The bioluminescence had followed them up and the air was moving slightly, 
circulation from somewhere, the building's old ventilation being repurposed.
"You knew about this before we met. Guided me to it" Nim said to Krit.
Krit said nothing. The knife across his knees. Substrate quiet.
"My connections. My contacts. My father's money clearing the path. And you let me think we were here for Dao, for the bloom"
"We were here for those things too"
"Don't" Her voice cracked. She could feel her hands shaking harder and she put them flat on the concrete to stop it. "Someone whose 
reg usage would keep her from asking the right questions. That's what I was"
Krit looked at her then.
"And now what?" Nim asked.
"Now you stopped me. Now its your fight"

From the booster, Dao's voice: "Nim"
"Dao"
"I'm coming out" A long pause. The signal crackled. 
"It's hard. It's hard to be me in here"
"Then come out"
"I'm trying. There's a lot of me in here now and I need to find which parts are the ones that go back"

Nim closed her eyes. Dao had said the sak yant dissolved the boundary. When I read a mesh I don't receive the data, I am the data, 
and it's hard to be me afterwards.
Jess was breathing carefully, short measured breaths, testing what the scrubber chemicals had done to her throat. 
"What if it sends back something that isn't her?" Jess croaked.
The water level on the landing had stabilised. Wherever the synth had routed the building's old systems, it was holding.

The way out was through the stairwell and up. The synth held the water back for them, floor by floor, and they climbed in dim 
bioluminescence until the concrete gave way to a service hatch and open air and the first grey light before dawn. Jess's boat was 
where they'd tied it. The bloom had pooled around the hull and Dao sat with her back against the gunwale and her eyes on the water, 
watching them, and after a while she looked away, deliberately, as if practising.

They climbed into the boat and Nim sat with Jess next to her, close enough that their arms touched. Krit looked at Nim.
"คุณเห็นแล้ว" he said. You see it now.

The sun was coming up. The city came on in pieces.
`},
{ id: "un-carino",
    name: "Un Cariño",
    tags: ["LLM-only", "One-shot"],
content: `Marco opened the porthole at four-fifteen because Davi had always liked the salt air and because the cryostat 
ran warm for the first twenty minutes after cycling, so the room needed cooling anyway. Two problems, one solution. 
Marco was good at that. He'd been good at it before Davi died and he'd gotten better since, the way you get better at 
anything you do every week for three years.

The station was a retrofitted drilling platform forty kilometers off the Falklands. Davi had picked it. He'd been 
studying krill aggregation in the Scotia Sea and needed somewhere cheap to work from, and the platform was being 
decommissioned by a phosphate company that wanted a tax write-off more than it wanted to negotiate a real sale. Davi 
had talked them down to a lease that was essentially free in exchange for maintaining the desalination system. He was 
like that. He could talk anyone into anything and then act surprised when they agreed, as if he hadn't been steering 
the conversation since the second sentence.

Marco set out the coffee. Not for Davi, obviously, but because the smell was part of the room, and the room was part of 
the process. He'd learned early on that the first thirty seconds mattered more than anything else. What the ghost 
encountered when it surfaced set the whole session. A cold room, an unfamiliar sound, a light in the wrong place, and 
those thirty seconds went to confusion, and confusion cost minutes, and minutes were the only currency Marco had.

He'd tried music once, in the first year. A recording of Astor Piazzolla that Davi used to play while he worked, loud 
enough to hear over the centrifuge. The ghost had oriented to it immediately, faster than any session before, and Marco 
had felt a jolt of something close to triumph. Then the ghost had said, "Turn it off" Not angry. Not confused. Just: 
turn it off. And Marco had, and the session had been bad, short, jagged on the monitor, and afterward Marco understood 
that the music was too specific. Too much itself. It asked the ghost to be a person who had a relationship with that 
music, and that was more weight than the first seconds could bear. After that, Marco kept the room simple. Coffee smell. 
Salt air. The hum of the cryostat, which was constant and meaningless and therefore safe.

He'd gotten the room right. It had taken a year of adjustments, but he'd gotten it right.

The monitor was a flatscreen he'd bolted to the wall above the workbench. He'd customised the display module: a single 
descending line, green to yellow to red, with a percentage in the corner. He used to have more data on screen. Thermal 
noise floor, qubit error rates, the drift index on the classical model's weighting. He'd stripped all that out in the 
second year. It was like driving: at some point you get better results if you stop watching the tachometer and just 
listen to the engine.

He initiated. The line appeared at the top of the screen and held.

"Marco"
"Hey"
"Was I just here?"
"Tuesday. Four days ago"
"Four days" A pause. "That's not bad"
"Getting consistent"
"You've been working on it"
"A little"

This was not true. Marco had been working on it constantly. He'd rewritten the thermal floor module twice since January. 
The latest was called "un cariño", a little kindness, meaning more that it was a hack which shouldn't work but did. 
Then he spent three weeks debugging an interaction between the coherence monitor and the classical model's attention 
layer that was costing him six to ten seconds per session. Six to ten seconds didn't sound like much. It was a lot.

Davi's voice was close to right. Lower than the real thing, and it didn't move around the room the way a voice from a 
body moves, but Marco had stopped noticing that in the first year. You adjust. The brain fills in what it expects, and 
Marco's brain expected Davi in this room, at this hour, on a Saturday.

"How's the weather?" Davi said.
"Slate. Windy. The usual"
"The usual. You say that like it's not the worst weather on the planet"
"It's not the worst weather on the planet"
"Name worse weather"
"Antarctica"
"Antarctica is a continent. That's cheating"
"You asked me to name worse weather. I named worse weather"
"You named a worse place. The weather here is specifically, pointedly bad. It's bad on purpose. Like someone designed 
it"

Marco smiled. This was Davi, or close enough. The real Davi had been like this: argumentative about nothing, committed 
to positions he'd chosen for their indefensibility, willing to spend twenty minutes proving that the Falklands had worse 
weather than Antarctica because the argument was more interesting than the answer. He'd been a marine biologist who read 
philosophy and a terrible cook who had opinions about restaurants and the kind of older brother who called you an idiot 
with enough warmth that you felt complimented.

He'd also been meaner than the ghost was. Marco didn't think about that. Not in those terms. He thought: the sessions 
have gotten smoother. He thought: I've gotten better at the room.

"Heard from Lena?" Davi said.
"Last week. She's still in Ushuaia. The institute extended her contract"
"Good for her. She's too smart for that place"
"She likes it"
"She likes being needed. That's not the same thing"

This was the kind of observation the real Davi would have made, but the real Davi would have pushed it further. Would 
have said something about Lena that was unkind and true and that Marco would have argued with, and the argument would 
have gone somewhere neither of them expected, and they would have come out of it knowing something they hadn't known 
going in. The real Davi picked at things until they opened up. The ghost stated things and let them sit.

"I've been thinking about the krill data" Davi said.
"Yeah?"
"The aggregation patterns from that last season. Before"
"What about them?"
"I never finished the analysis. There was something in the nighttime distributions, a periodicity I couldn't account 
for. Tidal, maybe, but the cycle was off. Too long"

Marco had the data. He'd kept all of Davi's files, organized them, backed them up to three separate locations. He'd read 
through the krill papers in the first year, looking for something he could continue, some way to keep Davi's work going. 
He hadn't understood most of it. Davi had been the biologist. Marco was an engineer. He could maintain the equipment 
Davi had used, could keep the desalination running and the platform habitable and the cryostat at operating temperature, 
but the actual science, the thing Davi had come here to do, was beyond him. He'd accepted that. It was fine. The 
sessions were enough.

"I could pull up the datasets" Marco said. "If you want to look at them"
"Could you?"
"Sure. Next session, I'll have them ready"
"That would be good. That would be really good"

Marco wrote it down. He'd pull the files, format them for the display, have them up when Davi came back. He'd done this 
before with other things. Photographs Davi asked about. Papers Davi wanted to discuss. Once, a recipe for a lamb stew 
that Davi said their mother used to make, which Marco had found in a notebook in the kitchen and transcribed and taped 
to the wall where the ghost could see it. These requests felt important. They felt like Davi reaching for his own life, 
trying to touch the things that had mattered to him.

They were also, Marco knew in a way he didn't examine, easy to fulfill. The ghost asked for things Marco could provide. 
It didn't ask to go outside. It didn't ask to taste the coffee or feel the wind. It didn't ask questions Marco couldn't 
answer. In three years of sessions, the ghost had never said anything that sent Marco to bed staring at the ceiling the 
way the real Davi had, regularly, with a comment delivered at dinner or over the sat-phone from the mainland that was so 
perfectly calibrated to find the sore spot that Marco would lie awake composing replies he'd never send. The ghost was 
Davi without the precision. Without the cruelty that wasn't quite cruelty, that was more like a refusal to leave things 
alone, a compulsion to find the one thing in the room that everyone had agreed not to mention and mention it.

The real Davi had once told Marco, at their father's birthday dinner, in front of the whole family, that Marco's 
girlfriend at the time was performing a version of herself that she thought the family wanted to see, and that Marco 
either couldn't tell or didn't care, and which one was it? The girlfriend, Ana, had left the table. Their mother had not 
spoken to Davi for two weeks. Marco had not spoken to Davi for three. And then Marco had called him, and they'd talked 
for an hour, and Davi had been right about Ana, and Marco had known it, and the three weeks of silence had been the time 
it took Marco to forgive Davi for being right in the worst possible way.

The ghost would never do that. Marco was glad about this, and thought of it as progress.

"Lena should come down" Davi said. "She'd like the station"
"She has come down. Twice"
"Oh. Right"

Lena had come twice, in the first year. The first time she'd sat through a session and cried and afterward told Marco it 
was extraordinary, that it was really him, that she could hear him in the phrasing, in the arguments, in the way he said 
"that's cheating" when you made a point he couldn't counter. The second time, three months later, she'd sat through a 
session and not cried and afterward had stood on the platform deck looking at the water for a long time before saying, 
"He's different"
"He's always a little different" Marco had said. "The base state isn't a perfect capture"
"That's not what I mean"

Marco had waited for her to say what she meant, but she'd gone inside to pack her bag, and on the boat back to the 
mainland she'd been quiet, and she hadn't come back.

They still talked. She called every few weeks. She asked about Marco's health, about the platform, about the weather. 
She didn't ask about the sessions. Marco assumed she'd made her peace with it in her own way, which was a phrase that 
came from his own thinking but could have come from a therapist, if Marco had seen one, which he hadn't, because there 
were no therapists on a drilling platform forty kilometers off the Falklands and because Marco did not think he needed 
one. He was fine. He was doing well. The sessions were going well.

"You should invite her" Davi said. "For a weekend. I'd like to see her"
"Maybe" Marco said.
"She probably thinks I'm mad at her about something"
"Are you?"
"Am I? I don't think so. No. I don't think I'm mad at anyone"

This was true. The ghost was never angry. It was warm, curious, occasionally funny, sometimes wistful in a way that made 
Marco's chest tight. But it was never angry. The real Davi had been angry often. Not violent, not cruel, but angry the 
way people with high standards are angry: at things that fell short. At sloppy work, at lazy thinking, at people who 
settled for good enough. At Marco, sometimes, for being too patient, too accommodating, too willing to smooth things 
over instead of saying what he meant.

Marco checked the monitor. Forty-one percent. The line was smooth. A good session.

"I want to ask you something" Davi said.
"Go ahead"
"Do you think I'm still working on things? Between sessions? Like, am I thinking about the krill data when I'm not here?"
"I don't know" Marco said. "I don't think it works that way"
"No. I didn't think so"
"Does that bother you?"
"Not really. It's just strange to think that I only exist when you turn me on. That I'm not somewhere in the meantime, 
being annoyed about something"

Marco laughed. It was a real laugh. The ghost could still do that to him, could still find the sentence that cracked the 
room open. It happened less now than in the first year, but it still happened, and when it did Marco felt the specific 
relief of a person who has been holding something and can, for a moment, put it down.

"You'd want to be annoyed?" Marco said.
"I'd want the option. Being annoyed is underrated. It means you care about how things should be"
"You used to be annoyed about everything"
"I used to care about everything"
"Same thing"
"Same thing" Davi agreed.

Thirty percent. Marco could feel the session entering its last third. The voice wouldn't change. The phrasing wouldn't 
change. But something would leave, incrementally, the way color leaves the sky after sunset: not at any particular 
moment but across all of them.

"I want to look at those datasets" Davi said. "The krill. I feel like I was close to something"
"You were always close to something"
"Occupational hazard"
"I'll have them ready"
"Thank you"
"Of course"
"Marco?"
"Yeah?"
"You're good at this. Taking care of things. You were always good at that. I used to think it was because you didn't 
want to fight about anything, but I think it's just how you are. You see what needs doing and you do it"
"Okay" Marco said.
"I mean it"
"I know"

Nineteen percent. The coffee was cold. The porthole was still open and the wind had picked up, carrying salt and the low 
smell of kelp that meant the tide was going out. Marco would close the porthole after the session. He would shut down 
the cryostat, note the session length in his log, eat dinner, check the desalination filters, and go to bed. On Tuesday 
he would pull Davi's krill datasets and format them for the display and position the screen where the ghost could see it 
and cue the files so that when Davi surfaced and oriented and said Marco and asked what day it was, the data would be 
there, waiting, like the coffee smell and the salt air, one more piece of the room that said: you are where you belong, 
everything is ready, you don't have to reach for anything because it's already here.

Nine percent.

"Same time Tuesday?" Davi said.
"Same time Tuesday"
"Good"

The line touched zero. The room was quiet. Outside the porthole the South Atlantic was the color of wet slate and the 
wind was steady and the tide was going out and the platform sat on its pylons the way it had been sitting for decades, 
maintained now by a single person who kept the filters clean and the temperature right and the room ready, who was very 
good at taking care of things and who did not notice, or did not think to notice, that in three years of sessions his 
brother had not once made him lie awake composing a reply, had not once found the sore spot, had not once said the true 
thing at the wrong time in the wrong way that opened the room up to something difficult and uncontrolled and real. Marco 
noted the session length: fourteen minutes, six seconds. A new best.

He closed the porthole. He went to find something to eat.

The krill data was on a drive in the desk drawer. He'd pull it tomorrow. He'd format it carefully, the way Davi would 
have wanted, columns clean, metadata intact. The ghost would look at it on Tuesday and say something about the 
periodicity, the nighttime distributions, the thing Davi had noticed before he died. It would say something that sounded 
right. Marco would nod. And the datasets would sit on the screen the way the recipe sat taped to the wall and the 
photographs sat in their frames: one more piece of the room that answered a question before it could be asked, one more 
thing the ghost would never have to reach for, never have to fight to get, never have to be angry about not having.

The desalination filters were due for cleaning. Marco pulled on his work gloves and went.`},
{ id: "reserve",
    name: "Reserve",
    tags: ["LLM-only"],
content: `Haude Teverikh was already in the waiting room. They were sitting on the bench with their hands pushed between 
their knees, breathing in a pattern that was clearly taught. The waiting structure was cob and bamboo laminate, its 
curved roof a living sedum mat that insulated in winter cycle and bloomed yellow-green in summer. The south wall was a 
filtration membrane, greywater from the agricultural band above running through layers of sand and root-mass and 
mycorrhizal mesh before dripping, clean, into the reserve's irrigation channels. Mushrooms fruited along its lower edge, 
oyster and lion's mane, available to anyone passing through. Someone had taken a few that morning; the cut stems were 
still wet. A printed sign in three languages asked visitors to leave the smallest specimens for sporing. It was not 
enforced. In Kousseri, very little was enforced; things either worked because people agreed they should, or they didn't 
work, and then you sat in a governance circle and talked about it until something better emerged or everyone was too 
tired to argue.

Kesseny watched for a moment. The body she wore, a vacuum cargo frame she'd claimed off the decommission list eleven 
years ago, had joints built for holding fifty-tonne containers steady in microgravity. Stillness was the one thing it 
did without effort.  Then she ducked under the lintel. She held out the manipulator she'd had retrofitted with something 
that could approximate a handshake, thermal surface set to 32 degrees.

'Haude?'

'Yes'

'I'm Kesseny. I've got a route planned, about an hour. How are you on rough ground?'

Haude stood and something happened to the way they held themselves. Their spine unlocked. Not relaxation exactly, more 
like a correction, the body finding a posture it had been trying to reach and failing. 

'I'm good'

At 0.4 standard gravity, people moved differently. Kesseny had watched hundreds of visitors come through the reserve 
gate. Shoulders dropped. Steps lengthened. Some people laughed. Some cried. Haude did neither; they just walked, and the 
walking had a quality of directness to it, as if between the elevator and here they had put down something heavy they'd 
stopped knowing they were carrying.

The trail wound through the old-growth engineered forest. Oak, beech, silver birch, seeded during initial habitat 
construction and left to do what forests do when you give them soil and light and patience. Kesseny had studied 
pre-industrial pollen core data from European forests to understand the ratios, the spacing, what these species did when 
nobody was optimising them. Then she'd spent three years not optimising. The canopy closed overhead and the light 
changed, thickened into something amber and particulate, the air circulation catching the engineered pollen and moving 
it in slow currents. Underfoot the path was packed earth and leaf litter, and the leaf litter was doing things: fungal 
threads visible as white filaments where Haude's boot broke the surface, an ecosystem in the top two centimetres of soil 
that had taken a decade to establish. The fact that predictable outcomes could still feel miraculous was something 
Kesseny thought about often and had not resolved.

'You're an ecological design tech', Kesseny said, reading from the referral. 'Soil remediation team?'

'Subsurface drainage. Section four of the remediation protocol is mine. Seven years ago'

'I know section four'

The trail came to the rise above the wetland. Below, the stream spread into reedy shallows and a heron stood in the 
water. It was hunting, which meant it was not moving. Kesseny had watched this particular bird for two years. It fished 
the same stretch of shallows on a three-day rotation, always entering from the west bank where the alders screened it 
from the path, and it had a success rate of about one strike in four, which was within the range for grey herons on 
Earth, a fact Kesseny found privately astonishing. The heron had been hatched from a gene-banked embryo in a lab in the 
0.6 band. It had never seen a river that wasn't plumbed. And yet it fished like a heron, stood like a heron, knew 
exactly what it was. Nobody had taught it. Haude stopped walking.

'Dr Ousseni's referral says gravity dysphoria' Kesseny said after a moment.

'That's what she calls it'

'What do you call it?'

A beetle was crossing the path, iridescent, blue-black. One of Szabolcs's native-analog species from the mycology lab. 
Haude stepped over it.

'I don't call it anything. I just hurt. Three years now. Everything scans normal. Nothing structurally wrong. Except my 
vestibular response normalises at 0.4. My cortisol flattens out. The pain stops' 

They looked at the heron. 

'And 0.4 is here'

'And 0.4 is here'

Below them the heron struck. Fast, then the slow ugly business of swallowing.

'I get referrals like yours a couple of times a year', Kesseny said. 'The protocol is eight hours maximum, twice a week. 
Below eight hours, a single human presence doesn't register on the ecological stress indicators. Above it, things shift. 
Soil compaction. Microbial changes. The system notices'

'Dr Ousseni mentioned transfer. Ouaga Station. Libreville Hab' Haude said it the way you say a diagnosis you've already 
received.

'They have residential at 0.4'

'My whole life is here. My repair commons, my medical team, everything. Dr Ousseni has been managing my neural work for 
six years. You don't restart that'

'No. You don't'

'The charter prohibits residential in this band'

'Yes'

'I voted for the charter'

Kesseny let the silence hold. The heron rearranged itself and went back to not moving.

'On the old Assembly wall in Spoke 3', Kesseny said, 'there's an inscription from Laboure. You know it'

'Everyone knows it. "I dreamed I was a child, marvelling at all I could become. I woke in old age and every possibility 
had gone." Ellulists use it in the regret-minimisation class. You are supposed to see you own failures in it "my life is 
a series of safe, meaningless decisions", that sort of thing'

'I think about it a lot. How he built Ellulism as a system and in the end discovered it had no room for what he was' 

"You must love this place" Haude said instead.

“The models say a human can't live here without the system degrading. But I've been watching this ecology for eleven 
years and it has surprised me more often than it hasn't. The otters weren't in any model. The kingfishers came back two 
years early. The fungal networks rate of phosphorus uptake is astonishing.”

Haude considered this. "It sounds wild"

"It is" said Kesseny

They walked back along the lower trail. Haude asked about the bats and Kesseny told them about the two years she'd 
fought the lighting committee. Pathway lights. Dim, tasteful, solar-charged pathway lights so visitors could walk after 
dark. The trail passed through a section where the reserve's infrastructure showed. A bioplastic rainwater collector, 
mottled green with algae, feeding a sand-filter cistern half buried in ferns. Overhead, barely visible through the 
canopy, the gossamer curve of the station's far side: agricultural terraces, the bright strip of the solar collection 
band, and beyond that the residential spokes where people lived and worked and repaired things and shared meals in 
commons.

At the perimeter gate Haude stopped. The elevator was ten metres away. They stepped into the elevator and Kesseny 
watched their shoulders begin to rise before the doors even closed, the muscles re-engaging in anticipation, the body 
bracing for a weight that was not here yet but was coming, was always coming.

The gate closed. The elevator rose. In the reserve the stream ran over its rocks, and the fungi passed their signals 
through the soil, and the heron slept in the dead oak by the north bank that Kesseny had argued against removing because 
dead oaks held more life per cubic metre than living ones. It slept the way herons have always slept, on one leg, head 
tucked, as though no one had ever explained to it that it was the product of a laboratory and a freezer and a 
hundred-year plan. The reserve did what it did. It became more itself, slowly, in the absence of anyone who needed it to 
be something else.`},
{
    id: "attention-part-1",
    name: "Attention - Part 1",
    tags: ["Assistant"],
    content: `She was the seventh child they'd tested that month.
    
Nim watched from behind the partition glass while the girl, who was nine, picked at the seam of her left shoe. The 
filaments in the containment field drifted through configurations, and the display showed density impressions rather 
than numbers because they'd found early on that numerical readouts degraded the field stability. That finding had 
sounded mystical and had been dropped from the funding pitch. The pitch had failed anyway.

The shapes had been open for twenty seconds. The girl was sitting the way children sit when nobody has told them what 
to sit for, her weight on one hip, her attention somewhere general. Anyone who tried couldn't do it.

Twenty-two seconds. The filaments locked into a single configuration.

The girl looked at Nim through the glass with the mild irritation of someone who'd been told to sit still and was doing 
her best.

'Sorry' Nim said through the intercom. 'That was me'

Nim crossed to Rae's station, her thumb running along the cuff seal of her jacket. The lab occupied a converted 
semiconductor fab in Santa Clara, bought cheap when the foundries moved to orbital microgravity. The air handling still
carried a toluene ghost.

'Twenty-two seconds' Nim said. Her IA placed her own notes from Thursday beside it in her vision: fourteen seconds. 
The operator dependency getting harder to explain away.

Rae didn't look up. She was passing her thoughts and impressions from the session to her synth, letting it do the 
thinking about what everything meant so she didn't have to carry a theory into the next one. She looked peaceful.

'Every child we've tested still holds the field longer than the best adult operator' Nim said. 

She stopped to take in her IA input. 

'Most children' 

Another pause 

'A statistically significant cohort of the children we've tested, in controlled conditions, with caveats'

'I liked the first one better' Rae said. 'Do you want me to set up the thing with Augustine?'

Whatever Freehab had reverse engineered from the alien probe, their separatist elements sniffing around her company
suggested they hadn't figured out all of it. Nim wasn't sure she had either, and she definitely didn't want to pull the 
entirety of that idea into the focussed part of her mind her IA could reach. If it got out some government agency would 
be through the doors in an hour and the whole startup shut down.

'I'm happy to take his money if there really are no strings' is what Nim visualised and said instead. 

She paused while her IA helpfully introduced some context: Augustine Okafor. Probable Freeholder Paramilitary, black 
market connections. Do not take his money.

'I think the case is defensible' 

A longer pause.

'It's complicated'

'Nim' Rae paused and her hands came together, fingertips touching then opening. 
'The children, they are more at peace with the world than you' she said. Then she went back to her data stream.

At six Nim stepped outside, stopping at the south wall and putting her palm flat against the bricks. Warm. Still holding 
the afternoon while the crisp autumn air cooled around it. 

Crisp fall air, the IA corrected her. 

The marine change was coming in now, and the mote layer thickened with it, billions of sensors carried inland with the 
fog until the air shimmered. Rae came out.

'I watched you today' Rae said. 'You're so focussed on this that you collapsed the field from outside the room'

Nim nodded and took her hand off the wall. On the ridge the Tomb of the Unknown Human was catching the light, orange 
against a darkening hillside. The Society of Life had built it as an expensive promotional stunt, to "mourn those who 
died from curable senescence". Nim thought that curable senescence sounded like a type of glue, making dead people 
stop having options and became permanent.

There once were seven embryos, frozen in a clinic in Bangkok. For seventy-eight years they'd been nothing decided and 
then the fund crossed ฿100 trillion and a clerk at Siam International drew divination sticks and one stick came up with 
a number and Nimitra Wongprasert had begun her life and left the other six possibilities open.

'Your Tokyo suborbital's at ten' Rae said.
.`},
{
    id: "attention-part-2",
    name: "Attention - Part 2",
    tags: ["Assistant"],
    content: `The rain started on the way back and by the time the hopper crossed the Sumida the city had smeared into 
colours through the wet glass. Her IA placed a schedule for the evening in her peripheral vision. She brushed two 
fingers behind her ear to dismiss it. The reflections along Eitai-dōri stretched and reformed. For a moment a bank of 
kanji became a long smear of blue-green that reminded her of her glowing algae bloom dissipating through the water.

The dinner had been Yui's idea, or Yui's excuse. Yui worked for Angusu in photonic sales and had been Nim's point of 
contact for the intermediary that afternoon, a man named Taniguchi who had discussed weather systems and order 
book dynamics for ninety minutes in a conference room overlooking the palace grounds and at no point mentioned money or 
Augustine Okafor or the Freeholders or anything that would produce a record her IA could flag. When Nim left the
building the funding structure existed, somehow, the way a price exists after a trade, settled rather than decided. 
Her IA had flagged nothing because there was nothing to flag. Then Yui had said: come out tonight, I want you to meet 
some people.

Yui lived in Kōenji in a building old enough to have physical mailboxes. Her flat was on the sixth floor and was 
designed for one person and currently contained six. Yui opened the door and pulled Nim inside by the wrist. The 
flat smelled like yuzu and the music was a stuttering percussive loop that Nim's IA identified as a Martian export, 
MarsNet producer. She brushed behind her ear to stop it identifying things.

Yui handed her a glass. "You still look like a person who was in a meeting today"
"I was in a meeting today"
"You need to stop looking like it. Drink that"

It was cold and botanical and strong enough that it hit the back of her throat with a small violence. Yui was already 
across the room introducing her to people, a woman named Sora who worked in atmospheric modelling and had hands stained 
faintly orange from something she was building, a man called Hiro who didn't explain what he did, some others that
left and then two more people arrived. A man named Kazu who repaired biosynthetic instruments in Yanaka; and Michi, 
who was Yui's age and laughed hard and often and appeared to mean it every time, and who handed Nim a second drink 
before she'd finished the first.

"Why the algae?" Michi asked.

Nim thought about it. "It started as a filtration system. And then it became a way to monitor water quality. And now
also something to make the drowned parts of the city beautiful at night."

"The best kind of project" Michi said. "Outran your reasons. I had something like that in Kōbe, we were building—" 
Sora called something from the kitchen and Michi was up and across the room and whatever she'd been building in Kōbe 
stayed there.

They left Yui's flat into the light rain because Sora wanted ramen. The neighbourhood was dense and layered and the 
projection surfaces on the buildings made the wet pavement glow. They walked four blocks of narrow grassy streets to a 
place below what used to be street level where the bowls were enormous and the steam rose into a old ventilation system. 
The ramen place was thin and bright and the cook knew Yui. They sat at a counter that was too small with Hiro next to 
Nim, and when the food arrived she noticed how slowly and carefully he ate.

"You're watching me eat" Hiro said.
"Sorry. You just seemed very… present"
He smiled. Not at her. At his ramen. "No, I am thinking about something. I'm thinking about how good this is, the 
kansui. My mother used to put too much in and the noodles would go yellow and she'd say that was the correct colour"

Nim's IA placed a note in her vision: Saturday. Meeting with Augustine Okafor, Cultural Bereavement exposition, 
Aljanah Lunar Resort. She brushed behind her ear.

They left because Kazu knew a place. It was going to be a night driven by someone knowing a place, and Nim realised 
that the momentum wasn't hers, that she was inside someone else's evening, and the relief of this was so physical she 
felt it in her shoulders, muscles releasing she hadn't known were locked. The place Kazu knew was a listening bar in 
Asagaya, and when they stepped inside the street's managed quiet was replaced by an analogue crackle from a record. It 
was something Nim didn't know, slow and washed out, a guitar that kept almost resolving into melody and then pulling 
back, and the room was small enough that everyone was close. The owner was a woman who wore her age unrestored and
looked to be in her seventies.

They sat and drank and the conversation separated into pieces. Yui and Sora talking about Sora's atmospheric project. 
Kazu showing Michi something on his hands that Nim couldn't see from where she sat. Across the table Yui was holding her 
drink against her sternum with both hands, eyes closed, lips moving to something that wasn't the music. A count, or a 
word. Then she opened her eyes and was across the room refilling Kazu's glass, her hand on his shoulder as she poured.
Nim was next to Hiro.
 
"Were they good?" she said to Hiro. "Your mother's noodles?"
"No"
 
And then they were not talking, which was fine, since this was possibly the most restful thing that had happened to her 
in months. The music filled the space where conversation would have gone.

"What's the theme?" she eventually asked him, rather than her IA.
"Pre-Khan. She only plays things from before the storm. Her family had a recording studio up in Sapporo when it went 
dark. Down here was the center of the world for a while - the ASST transformers, right? So they relocated here and 
rebuilt, but made that their thing - only kept the analogue stuff"

Nim listened to the guitar which kept almost arriving somewhere. She closed her eyes and for a few seconds in the dark 
the room held her. 

At some point they lost Kazu. He said something to Yui in Japanese that Nim's translation layer rendered as "I'm going 
to become horizontal" and then he was gone, walking into the rain with his jacket over his head. Sora left with him, 
the orange hands in her pockets.

The rest of them walked. The rain had thinned to something not quite mist and not quite rain, and the streets at this 
hour were between states. Last trains gone, first trains three hours away. The people out now had chosen it. Yui talked 
to a man carrying a cello case and they appeared to know each other, or to have decided to know each other for the 
duration of that stretch of pavement.

They took a lift core at the interchange. Nim watched through the glass wall as the ground fell away, and at fifteen 
floors residential corridors slid past, quiet, closed doors, someone's laundry on a drying rack in a sleeping hallway. 
Then the lift opened at a junction platform at the twenty-eighth floor and they crossed a short bridge to a wider one.
The bridgeway was open to the sky on both sides, wide enough for stalls built into the structural piers, and above and 
to the south two more walkways crossed at different heights, one planted and residential, the other bright with food 
stalls and standing bars. Up there was where the night kept going. Michi moved through it in a way that told Nim she 
lived at this altitude or near it, weaving between a noodle counter that had colonised half the walkway and a cluster of 
people leaning on the railing and looking down at something. The wind pushed the mist sideways and the wet surfaces 
reflected everything twice. 

They walked past bars and all-night curry places and vending corridors where you could buy socks or thermoregulation 
patches or canned coffee that was better than it had any right to be. Michi bought two coffees and a yurumu tab and put 
one of each in Nim's hands. Nim peeled the tab and pressed it to the inside of her wrist. Michi was already walking.
Nim stopped at the railing.
Michi came back. "What are you looking at?"
"I don't know"
Michi leaned on the railing next to her and they stood like that. Nim stepped sideways to let a man with a food cart 
pass and her shoulder pressed against Michi's and neither of them moved away from it. They walked on at that distance.

Yui appeared with a small plastic figure from a capsule machine, a cat in some kind of suit, and put it in Nim's hand.

"Why?"
"Because you looked like you needed a small stupid thing"

Nim held it up and turned it. The tiny painted face. The tiny suit. The serious expression. Behind her Yui glanced at 
Michi. Michi looked back at her. Nim put the cat in her pocket. For the first time in days she thought of Jess. In 
Bangkok Jess was doing whatever Jess did. Survive. Somewhere at the edge of her vision a note about her heart rate 
appeared. It stayed there for a while, small and far away from the yurumu, and then it was gone.

Michi found a karaoke place. Of course she did. The entrance was through a modular unit bonded to the structural frame, 
and the corridor was narrow and fluorescent and smelled like cleaning products and whatever the previous group had 
spilled. Their room was non-immersive, real microphones, and small enough that their knees nearly touched. Yui sang 
first, an old pop song that she performed with a commitment that replaced quality with sincerity and came out ahead. 
Michi sang fado, which nobody expected, and her voice was actually good, and the room went quiet in the way they do when 
someone reveals something they've been hiding under all that laughing.

Hiro didn't sing, just sat and listened. Then Yui handed Nim the microphone.

"I can't sing"
"Nobody can sing. Michi is an anomaly"
"Thank you" Michi said.

Nim scrolled through the list. It was long and the titles meant nothing and she passed songs she probably knew and kept 
scrolling. She picked one because she recognised the first line. She sang it badly and the song was about something that 
only became clear while she was singing it. She sang it to the screen and didn't look at anyone. Her left hand was on 
her knee and at some point during the second verse it opened, palm up, and stayed that way. When she finished Michi 
clapped and Yui said "you sing like a beautiful emergency" which made Nim laugh.

The bottles emptied. Yui fell asleep on Michi's shoulder. Hiro sat with his eyes closed and Nim couldn't 
tell if he was meditating or dozing or consulting whatever it was that kept him so still. And then the night ended. 
Not because anyone said so. Michi yawned and Yui stirred and Hiro opened his eyes and the empty glasses clinked when he 
stood, and then they were all putting on jackets and settling up and filing into the narrow corridor. Under the 
fluorescent light Nim reached forward and picked a thread from the back of Hiro's jacket and dropped it. He didn't 
notice. 

They stepped out onto the walkway where the air was cold and the rain had stopped, and the city below was a different 
pattern now, the eastern sky starting to separate from the buildings. They took the lift core down in silence and 
stepped out onto the ground-level streets, which were darker and warmer and closer and smelled like wet grass and earth. 
Embraces. Michi held Nim's face in both hands and said "you have a good face" and then walked away towards Kōenji with 
Yui leaning against her, and the street was empty.

Nim walked, passing a shrine that had been folded into the ground floor of a newer building, the torii gate original, the 
structure around it polymer and glass. Inside, the small amber glow of something still running. She followed the slope 
up at Kagurazaka where the stone paving was wet and the noise from the main road fell away after a few metres. Paper 
lanterns still lit at some of the ochaya. A cat watched her from under an eave and she went down some stone steps past a
moss garden the size of a tablecloth. Soon a moat came up on her left, a black width of water, and beyond it the wall 
and the palace forest rising behind, a mass of trees that made no sound. Across the water the Marunouchi towers were 
lit, infrastructure humming without people, climate systems and water treatment and mote relays and the quiet processing 
of a million IAs turning the day's data into something searchable and permanent. Rae would say the city was in REM, 
pruning its synaptic commitments. And here was Nim walking through it awake, accumulating. She felt the plastic cat in 
her pocket and called a hopper to take her back to her hotel.

By the time she got back to her room the yurumu was wearing off and the city outside the window was starting to lighten, 
the sun catching the distant upper storeys and shifting the building's surface out of its night phase. She sat on the 
edge of the bed and closed her eyes, her body in the room but her attention loosening. An image came in, the way things 
come in when you're not looking directly, clean green and cream tiles small squares. A two-burner gas range, the wok 
ring dark with use, and a slowly turning ceiling fan moving real dust motes illuminated in the warm light from a window. 
There was someone in this kitchen who was not her, whose hands were on a counter, whose back was turned, whose hair was 
tied up and dark, and the kitchen would have smelled like something just cooked and the air would have been unmanaged 
and comfortable and warm.

Three seconds. Four. The hotel room came in at the edges and the tiles faded and the kitchen was going and the person 
in it was going. Nim reached for that the way you reach for something falling but it was gone, not because it was 
nothing but because it was something that couldn't pass through the aperture of a mind that was awake and definite 
and logging everything. The hotel room. The surface beneath her which had adjusted its temperature to her body. The city 
outside, brightening into morning.

Nim sat and felt the grief, not of the content dissolving but the understanding. She had understood something for three 
or four seconds, held close something about the kitchen and the person and her life, and the shape of that was 
evaporating because she was definite and this room was definite. She brushed her teeth and opened the expo invitation. 
She accepted it and booked a berth on the next cycler to Luna, because if the room was going to keep winning she was at 
least going to choose the right one to be in.

She put the plastic cat on the nightstand. She slept, and if she dreamed more she didn't remember it.
.`},
{
    id: "attention-part-3",
    name: "Attention - Part 3",
    tags: ["Assistant"],
    content: `The cycler smelled like scrubbed air, polymer, and the staleness of a vessel that was cleaned between 
passengers but never empty long enough to really lose them. Nim put her bag in the overhead net, found the plastic cat 
in the side pocket, and sat on the bunk with her feet on the cold floor.

Through the porthole the Moon was ahead, larger than when she'd boarded. She held her wrist and watched it. The cycler 
didn't stop, it swung between the two bodies and out beyond on a trajectory that had been calculated decades ago and 
maintained by small corrections ever since. Passengers shuttled up, rode the arc, shuttled down.

In the common lounge a woman was reading with a tea balanced on the armrest. Grey-brown hair cut short, thermal 
underlayer, a small medallion on a chain that she touched while reading the way some people turn a ring.

"Jasności?" Nim said.

The woman looked up. "Every ten years. My babcia started it"

Her name was Lena. Retired school administrator from Wrocław. Her grandmother had been a structural engineer on one of 
the early Shackleton mining operations and had known people who knew Kowalczyk, or said they had. Lena told it without 
apology: proximity to the story had become its own credential among the old lunar Polish, and Lena had inherited hers 
the way you inherit a set of dishes.

"Kowalczyk was a water specialist" Lena said. "Ice core sampling. When the storm hit he was underground. Radiation was 
manageable down there. He could have stayed"

"But he went outside"

"He sealed his suit and took the mining cutters and climbed. The recording is public. His breathing is very calm. He 
describes the dust in the electrostatic charge. He says it looked like curtains" 

She drank her tea. 

"Then he says something about knowing where to go. The church says guided. The family says he was a man who liked to 
climb and was dying and wanted to see the light at the rim of the crater"
"What do you say?"
"I say he took the mining cutters. A man who knows he's dying and the thing he brings is a tool for making permanent 
marks on rock"
"I’ve only seen it in sims. The carving" Nim said. "The placement looks incredible - the way her face catches the light 
and all around it is the dark. It must be overwhelming to actually be there"
"My babcia went the first time and felt nothing" Lena said. "She was an engineer. She said it looked like a construction 
project. She went back ten years later after her husband died and wept and couldn't explain why. Then she kept going 
back, every ten years, and I think she was trying to get back to how she felt the second time" 

Lena turned the medallion between her thumb and forefinger. "She never said whether she did"

They talked for another hour. Lena had opinions about the schedule at Peary Station and about the food in the transit 
lounge and about her nephew who worked the tourist dome and found it hilarious when Earth visitors cried during their 
first flight. "Not because it's emotional. The inner ear gets confused and the tear ducts activate. He says they always 
think they're moved"

Nim transferred at Peary. Lena went south. They didn't tag as contacts. Lena was probably the kind of person who assumed 
that if you were meant to meet again, you would.

---

The exposition was called Cultural Bereavement. Three connected halls, low lighting, the exhibits in clusters rather 
than rows. Each cluster had its own sound from directional speakers: a market recording here, a prayer chant there, the 
silence between them sharp and acoustically controlled.

Nim moved slowly. A reconstructed Ceres market stall, price labels in a creole that mixed Portuguese and Mandarin and 
something the placard called "local pidgin". A wall of MarsNet recordings from an abandoned Kasei Valles outpost, 
timestamps spanning eight years, the last entries weeks apart. A tactile display of textile patterns from a habitat at 
EML5 whose population had dropped below replacement during the Aliyah. The fabrics were intricate, rust and indigo in 
repeating geometries that shifted when you looked at them from different angles, but the knowledge of how to make them 
had died. 

She stopped at a listening station. A woman's voice singing in Martian creole over a hand drum and the hiss of an air 
recycler. The melody kept arriving at a resolution and sliding past it. The woman laughed at something mid-verse, a 
private joke or a mistake she found funny, and kept singing. The recording was dated 48 BFC.

"She died in the stillborn harvest. Most of the cultural archive from that period was recovered from personal storage 
after" A man's voice behind her, quiet, accented. She turned.

He was taller than her, and his face carried the soft fullness that never quite went away in people who'd spent their 
first years without gravity pulling the fluid down. Close-cut greying hair. A simple dark shirt and trousers, a small 
pin on his collar she didn't recognise. His hands were at his sides, relaxed, and when he moved his head to look at her 
his eyes tracked with a precision that didn't match the rest of him. He held out his forearm at a low angle with his 
fist clenched, and after a few seconds of confusion she remembered the zero G handshake and tapped the outside of her 
wrist against his.

"Nim"
"Augustine. Yui sends her regards. She says you left Tokyo without saying goodbye"
Nim almost smiled. "I'll bring back some great omiyage"

He looked at the exhibit. "I grew up on stations that sounded like these recordings. The air recyclers. You stop 
hearing them after a few months but they're always there in recordings from home. My father said the sounds of Nigeria 
never left him, but unlike me” 
He gestured to his thin frame “he always had the option to go back to Earth"

They walked. He didn't guide. He fell into step beside her and they moved through the exhibits. He stopped at things 
that interested him. At a display of Ellulist prayer objects from a decommissioned habitat he touched one of the glass 
cases with his fingertip.

He paused at a refreshment station. "Tea?" He was already ordering it. He touched something on his wrist. Her IA display 
went dark. "You can talk here" he said. "Tell me about the operator dependency"

So she told him. The real version. The containment field that held longer when nobody was trying. The way her own focus 
had collapsed the field from outside the room. The density impressions instead of numerical readouts because numbers 
degraded the stability.

He listened and drank his tea. "Have you looked at the propulsion data from the first contact probe?"
She looked at him.
"The propellant geometry is ambiguous across multiple configurations. Engineers who describe it in one definite geometry 
produce something that doesn't function. The people who can make it work can't write down what they do. It has to be 
transmitted by doing it together. Like those textiles" He nodded toward the EML5 display. "And you've made that 
connection but haven't told anyone because, security aside, it doesn't actually sound like science"

He was right. Or kind of right, because she knew parts of it were plausible, but the whole thing together seemed 
ludicrous when you said it out loud. 

"What do you want?" she said.

"I want your research to continue out here, without the self-censorship. Lab space, equipment, operators. People who've 
been working on adjacent problems for years"
"And in return"
"In return your work advances and so does ours. Antimatter propulsion opens up interstellar travel to all of humanity, 
or you could live in a world where the usual players control it all". 
He picked up his tea, found it empty, put it down again. 

---

The fitting took twenty minutes. The suit was a single piece, the wing fabric folding into channels along the arms and 
legs when not deployed. The leading edge spars were carbon composite and clicked into position when she extended her 
arms. The instructor was a young Turkish man named Emre who spoke four languages and treated first-time fliers with 
exaggerated patience.

"Three steps and a jump. In this gravity, two meters up. Extend your arms before you reach the top of the jump, not 
after. If you extend after, you'll be descending, the fabric loads wrong, you'll feel a jolt, you'll grab at the spars. 
That makes everything worse."
"What do I do if it goes wrong?"
"Relax your arms. Drop. Two meters. You'll land on your feet." He considered this. "Probably."

She launched. Three steps, a jump, arms out, and the fabric caught the air and she was rising, not fast, more like being 
lifted by a gentle wave. She moved her right arm down and banked left and the trees rotated below her and her inner ear 
sent a message that made no sense and her eyes overrode it. Her hands were open at the ends of the spars, fingers 
spread above nothing, and she was fine.

The dome's climate system pushed warm air up from the rille floor through the canopy, and when she found an updraft she 
rose without trying, the canopy dropping away below her. From above, the forest was dense and irregular, the trees 
engineered but left to grow into their own shapes, trunks leaning towards the light, crowns interlocking. Through gaps 
in the canopy the rille channels were visible, grey rock and shadow, the original volcanic geology under the imported 
soil.

She flew for forty minutes. Emre talked her through the first ten and then went quiet and let her find it. The trick was 
not to think about the arms. The arms were surfaces, not levers. You moved your body and the arms followed and the air 
did the rest. When she thought about the mechanics she wobbled.

On the second morning Augustine was at the launch platform. Already suited, the wing fabric folded along his arms, 
comfortable. They launched together. She was lighter, thirty years younger, and she used all of it, climbing into the 
upper dome where the air thinned. Augustine stayed low. He flew the canopy edge where the updrafts were strongest. His 
movements were unhurried. The long body that looked awkward on the ground was fluent here, taking lines through gaps 
between the larger trees that she wouldn't have tried.

She dropped to canopy level and flew through the trees. The trunks were close at this altitude and the branches formed 
corridors and intersections and she took them fast, tucking her arms to narrow her profile through gaps and extending 
again to catch the air on the other side. Behind her she heard the fabric snap of Augustine taking the same corridor and 
she pushed harder, dropping below a branch that forced her to curl her body and roll and extend out of the roll into a 
long straight run between two rows of beech, their leaves lit amber from the growth lamps and trembling in her wake.

She came out of the tree cover into open air above a wide rille channel. The channel was deep here and the air over it 
was cold and fast and she climbed on it, spiralling, the dome wall rising beside her. Augustine came out of the trees 
below and to her left. He found the same column of air and climbed it on a wider spiral, slower, and the geometry of 
their two spirals brought them closer on each turn until they were at the same altitude, twenty metres apart, rising 
together.

At the top of the column the air flattened out and they were in the upper dome, close to the structural panels. She 
levelled off and he levelled off beside her and they flew side by side along the dome wall. Green canopy below and 
the gentle curve of the dome above, and in the black sky above the Earth was rising, the terminator sharp along its 
western edge and the blue-white of a cloud system over the deep blue of the Pacific. The whole Earth was held in the 
darkness by a beam of sunlight, and that made the engineered light hitting the trees below and the thin fragile dome 
above both more alien and more beautiful.

They descended together, slowly, into the canopy, and landed in a clearing near the rille edge. They stood catching 
their breath. The flight suits ticked as the spars cooled. Augustine unclipped his leading edges and folded the fabric 
back along his arms while she was still catching her breath. He held out his forearm, and she tapped her wrist against 
his, and he smiled and when she was ready they bounded back together along the path through the engineered forest.
`},
];
