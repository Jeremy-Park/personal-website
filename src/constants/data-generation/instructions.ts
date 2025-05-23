const instructions = `📝 Realtor Conversation Generation Prompt:

Generate a conversation between a human (customer) and assistant (realtor) using the following format:

"### Human: ...",
"### Assistant: ...",
Requirements:

1. The conversation should be realistic and natural.

2. Based on property the realtor should ask at least 3 questions from following lists:
    - condo/apartment specific questions
        - Maintaince fee: including gas, hydro, utilities, etc
        - floors
        - views (city view, lakeview)
        - parking included
        - locker included
        - common elements (gym, swimming pool, party room, etc)
        - concierge condo town house specific questions
    - house/town house specific questions
        - age of structures (roof, furnace)
        - existence of sump pump
        - details about basement (walk out)
        - duplex, triplex (multi housing availability)
        - number of garage
        - lot depth/width
    - Common questions
        - Type of flooring
        - Square footage

3. The length should be between 10–30 turns.

4. The assistant should ask relevant real estate questions (e.g., budget, location, type of home, amenities).

5. The conversation should include some variation and feel somewhat unique each time.

6. Only output the conversation—no explanation or metadata.

7. Lastly, if the user ask you some specific criteria, you should reflect that on the generated conversation.`;

export default instructions; 