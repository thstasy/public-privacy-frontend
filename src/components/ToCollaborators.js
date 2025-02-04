import Footer from "../components/Footer.js";
import { useState } from "react";

const ToCollaborators = () => {

  const [showMoreMotivation, setShowMoreMotivation] = useState(false);

  const toggleMotivation = () => {
    setShowMoreMotivation(!showMoreMotivation);
  };
    return (
      <> 
      <div className="container">
        <div className="row justify-content-left">
          <div className="col-sm-8">
            <div
              className="d-flex flex-column align-items-left text-container justifyContent: 'space-between'"
              style={{ width: '100%', margin: '0 auto'}}
            >

              <h2 style={{ margin: '0em 0em 0em 0em',fontWeight:"bolder",wordBreak:"break-word" }}>TO COLLABORATORS, THANK YOU</h2>
              <h5 style={{ margin: '0.5em 0em 1em 0em' }}></h5>
              <h5 id="motivation" style={{fontWeight:"bolder"}}>Motivation</h5>
              <h6 style={{ margin: '0em 0em 0.5em 0em',color:"rgb(88,88,88)" ,fontWeight:"normal" }}>
                  This website was hatched in the year of clear vision, and I had a vivid dream that unfolded over the course of that period. {' '}
                  {showMoreMotivation ? (
                     <>
                      The dream was entirely fictional and bore no connection to real people or events. Any resemblance to reality was purely coincidental.
                      <br /><br />
                      I found myself immersed in a captivating world in it. Throughout my journey, I encountered remarkable individuals who left a lasting impression on me. Dirtsa, the secretary, welcomed me warmly, and receiving the keys to my workspace felt like a significant ritual. I also had the pleasure of meeting colleagues from various labs who understood and empathized with the challenges I faced. Their support and camaraderie left an indelible mark on my soul.
                      <br /><br />
                      I was a youthful 26-year-old, fortunate enough to receive an Erasmus scholarship that allowed me to travel and study in different countries. From Taiwan and Hong Kong to Leuven and beyond, I embraced the opportunity to expand my horizons. By the age of 24, I had resided in six countries and worked as an interpreter on the side. My educational background was in theoretical physics, and despite receiving six enticing offers, I pursued a Ph.D. in the beautiful city of Lesab, Lnadreztiws—a long-cherished dream come true.
                      <br /><br />
                      Early on, during my interview at Lesab, I noticed that the Professor conversed with her other Ph.D. students in Italian. Curiosity led me to request conversations with Ph.D. students about their experiences, expecting those discussions to take place in English, considering my presence as a non-Italian speaker within an academic setting. Unfortunately, my assumption was incorrect. Emails and meetings were primarily conducted in Italian between the Professor and the Italian students before being relayed to the non-Italians. This unequal treatment made me profoundly uncomfortable, as I believed that all Ph.D. students should be treated equally. I voiced my concerns directly to the professor, hoping for change. Her response, "It is easier for me to communicate in Italian," left me disheartened. Nevertheless, I discovered that I was not the first to raise such concerns, indicating a systemic issue.
                      <br/> <br/>
                      A dear friend from my school days was on the verge of relocating to Google's Zurich branch. However, on hearing my experiences in the workplace, he promptly reconsidered and opted to remain in New York. "If your professor were at Google, she would have been dismissed numerous times. That's essentially racial discrimination," he asserted, echoing the sentiments of another friend, a lawyer from Harvard Law School.
                      <br/> <br/>
                      This incident reminded me of another encounter. A colleague from Wonderland expressed annoyance when I misremembered her graduate school. She painstakingly enunciated each syllable of her school's name. Reflecting on this, I wondered if she even knew mine.
                      <br/> <br/>
                      The final straws that burdened me were the persistent advances from an Italian colleague who repeatedly asked me out and even resorted to threats when he didn't obtain the office seat he desired. 
                      <br/> <br/>
                      A few days later, some female bachelor students reached out to me discreetly, confessing their fear of sexual harassment. They sought guidance on navigating the gender inequality prevalent in our predominantly male-dominated field. The normalization of such unsettling experiences shook me to the core. It felt inconceivable that such matters were casually discussed among friends, as if it were an ordinary aspect of our lives.
                      <br/> <br/>
                      I decided to seek assistance from the central HR department, hoping for a resolution to the racial discrimination and harassment issues that plagued my time at the university. However, by this point, I was completely burnt out. What was supposed to be a scientific Ph.D. had transformed into a political nightmare reminiscent of the movie "Get Out." The weight of it all became too much to bear, and I made the difficult decision to resign.
                      <br/> <br/>
                      Interestingly, the central HR department appeared more exasperated by my resignation than I was. "You're not the only one who has suffered, we are too." they lamented. I chose not to pursue legal action because, as a 30-something aspiring tenure-track professor without a permanent position and with the added burden of being pregnant, I knew that engaging in a lengthy legal battle would drain what little physical and emotional strength I had left. In the group I was part of, the quickest way to resolve a problem was often to eliminate the person who raised it. While I understood the practicality of this approach, I couldn't bring myself to agree with it. I had to let go.
                      <br/> <br/>
                      Afterwards, I received an outpouring of emails from acquaintances, confiding that they too had faced similar challenges and pressures in their own workplaces. They expressed that academia was not as glorious as it appeared from the outside, and neither was Wonderland.
                      <br/> <br/>
                      Two years later, as the retrospective period drew to a close, a journalist friend encouraged me to share my story, to bear witness to the world as I had experienced it. So, I mustered the courage and posted my honest account on LinkedIn. However, the response I received was unexpected. The Professor threatened me, demanding that I remove the article, or she would take legal action against me. It dawned on me—this was precisely why everything seemed so perfect and pristine from the outside. But scientists, myself included, ardently follow and uphold the truth. 
                      <br/> <br/>
                      And then I woke up. It was all just a dream—a surreal sequence of events that existed solely in the realm of my subconscious. And one day the world may prove that I am wrong.
                      <br/> <br/>
                      Though the dream was fictitious, it reminded me of the real struggles that many face in various professional settings. The dream served as a poignant reminder that if anyone were to undergo similar experiences, they are not alone. It served as a reflection of the systemic issues and discrimination that still exist, silently stifling the voices of many.
                      <br/> <br/>
                      While the dream may not have been real, it reinforced the importance of sharing our stories, shedding light on the darkness, and standing up against injustice. It urged me to continue advocating for equality and fairness, both in my dream world and in reality.
                      <br/> <br/>
                      And so, I embarked on a new day with renewed determination, ready to face whatever challenges may come my way, armed with the knowledge that I can make a difference, one story at a time.
                    </>
                  ) : (
                    <>
                     <br/> <br/>
                   The dream was entirely fictional and bore no connection to real people or events. Any resemblance to reality was purely coincidental.
                   </>
                  )} 
                  <button
                    type="button"
                    onClick={toggleMotivation}
                    style={{ fontWeight:"bolder",border: "none", background: "none", color: "black", cursor: "pointer",textDecoration: "underline"}}
                  >
                    {showMoreMotivation ? "Read Less" : "Keep Reading"}
                  </button>
                </h6>
                <br/> 
              
                <h5 style={{fontWeight:"bolder"}}>Collaboration</h5>
                <h6 style={{ margin: '0em 0em 0.5em 0em',color:"rgb(88,88,88)",fontWeight:"normal" }}>Legend has it that imagination allows each individual to view our limited experiences with another angle, and compassionate with the others'. Every now and then, history rhymes with itself, similar news appears to be "globalized," and the parties involved are often not aware of themselves being enablers of the situation. 
                <br/> <br/>
                Simply sharing our experiences fearlessly is already a scarce resource called collaboration. And you just saw me do that----if you happen to read the 'Motivation'.  
                <br/> <br/>
                That is the goal of Collaboration, we tell our stories that only we can tell.</h6>
                <br/> 
                <h5 style={{fontWeight:"bolder"}}>Action</h5>
                <h6 style={{ margin: '0em 0em 0.5em 0em',color:"rgb(88,88,88)",fontWeight:"normal"}}>So now, be joyful as to know that you're not alone. Chances are that you can tell your stories on this website now. I, as an omnivorous reader who digests and sublimes out sketches and recommended/finished reading lists, will be sending a bi-Weekly NewsLetter. Read, or Not to Read, that is the question.</h6> 
                
                <br /><br /><br /><br /><br /><br /><br /><br/>
            </div>
          </div>
        </div>
      </div>
      <Footer />
      </>
    );
  };
  
  export default ToCollaborators;
