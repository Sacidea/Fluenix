import React from 'react'
import { BookOpen, AlertCircle, CheckCircle2, XCircle } from 'lucide-react'
import '@/styles/behavioral.css'

export function BehavioralHandbook() {
  return (
    <div className="behavioral-handbook-container">
      <div className="handbook-header">
        <BookOpen size={24} className="text-blue-500" />
        <h2>The STAR Method Guide</h2>
      </div>

      <p className="handbook-intro">
        In FAANG and top-tier tech interviews, your technical skills only get you past the coding round. 
        To pass the "Behavioral" or "Leadership" rounds, you must prove you can handle pressure, work in a team, and take ownership.
        The industry standard way to answer these questions is the <strong>STAR Method</strong>.
      </p>

      <div className="star-breakdown">
        <div className="star-card">
          <div className="star-letter s">S</div>
          <div className="star-content">
            <h3>Situation (Durum)</h3>
            <p>Set the scene. Briefly describe the context, the team, and the specific problem you were facing. Keep it under 20% of your answer.</p>
            <span className="star-tip">Example: "During Black Friday, our payment gateway started dropping 10% of transactions..."</span>
          </div>
        </div>
        
        <div className="star-card">
          <div className="star-letter t">T</div>
          <div className="star-content">
            <h3>Task (Görev)</h3>
            <p>What was <strong>your</strong> specific responsibility in this situation? What was the goal you had to achieve?</p>
            <span className="star-tip">Example: "As the on-call engineer, I had to identify the root cause and restore the service immediately."</span>
          </div>
        </div>

        <div className="star-card">
          <div className="star-letter a">A</div>
          <div className="star-content">
            <h3>Action (Aksiyon)</h3>
            <p><strong>This is the most important part (50% of your answer).</strong> Detail the specific steps <strong>YOU</strong> took. Use "I", not "We". Describe the technical tradeoffs and communication.</p>
            <span className="star-tip">Example: "I checked the Datadog logs and noticed a memory leak in the Redis cluster. I coordinated with the DevOps team to scale up the nodes horizontally..."</span>
          </div>
        </div>

        <div className="star-card">
          <div className="star-letter r">R</div>
          <div className="star-content">
            <h3>Result (Sonuç)</h3>
            <p>What happened? Share quantifiable results (numbers, percentages, time saved). Mention what you learned.</p>
            <span className="star-tip">Example: "We restored the service in 15 minutes. Later, I wrote a post-mortem and added an automated alert. Since then, downtime decreased by 99%."</span>
          </div>
        </div>
      </div>

      <div className="example-comparison">
        <h3>Real World Example: "Tell me about a time you failed."</h3>
        
        <div className="bad-example">
          <div className="example-title">
            <XCircle size={18} /> A Junior/Poor Answer (No Structure)
          </div>
          <p>"One time the server crashed because of a bug in my code. It was stressful, but we worked together as a team to fix it and pushed a patch. My manager was mad but then it was okay. I learned to be more careful."</p>
          <div className="example-critique">
            <strong>Why it fails:</strong> Vague. Uses "we" instead of "I". Doesn't explain the technical difficulty. Sounds defensive and lacks quantifiable results.
          </div>
        </div>

        <div className="good-example">
          <div className="example-title">
            <CheckCircle2 size={18} /> A Senior/FAANG Answer (STAR Method)
          </div>
          <div className="star-highlight">
            <strong>(S)</strong> "While working on the V2 migration API, a misconfigured database index caused a severe lock, bringing down the staging environment for our testing team."
          </div>
          <div className="star-highlight">
            <strong>(T)</strong> "I was the lead developer on the feature, so it was my responsibility to unlock the database and prevent testing delays."
          </div>
          <div className="star-highlight">
            <strong>(A)</strong> "Instead of just restarting the database, I used pg_stat_activity to find the exact blocking query. I realized my batch-update script was missing a WHERE clause. I killed the specific PID, rewrote the script to use pagination (chunking 1000 records at a time), and added a unit test to verify the index usage."
          </div>
          <div className="star-highlight">
            <strong>(R)</strong> "The staging environment was back online in 20 minutes. My new paginated script ran 40% faster and was adopted as the standard for future migrations. I took full ownership in the post-mortem, which earned my manager's trust."
          </div>
        </div>
      </div>
      
      <div className="handbook-footer">
        <AlertCircle size={20} className="text-blue-600" />
        <p>Now that you know the theory, go to the <strong>Reading Practice</strong> tab to study real examples, and then use the <strong>Simulator</strong> to write your own STAR stories.</p>
      </div>
    </div>
  )
}
