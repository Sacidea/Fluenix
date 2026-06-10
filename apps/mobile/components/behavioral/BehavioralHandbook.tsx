import React from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import * as Icons from 'lucide-react-native';
import { colors, shadow } from '../../utils/theme';

const STAR_COLORS: Record<string, string> = {
  'bg-blue-500': '#3b82f6',
  'bg-indigo-500': '#6366f1',
  'bg-amber-500': '#f59e0b',
  'bg-emerald-500': '#10b981',
};

export function BehavioralHandbook({ onStartSimulator }: { onStartSimulator?: () => void }) {
  return (
    <ScrollView style={styles.scrollView} contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerRow}>
        <Icons.BookOpen size={28} color="#3b82f6" />
        <Text style={styles.headerTitle}>The STAR Method Guide</Text>
      </View>

      <Text style={styles.introText}>
        In FAANG and top-tier tech interviews, your technical skills only get you past the coding round. 
        To pass the "Behavioral" or "Leadership" rounds, you must prove you can handle pressure, work in a team, and take ownership.
        The industry standard way to answer these questions is the <Text style={styles.boldDark}>STAR Method</Text>.
      </Text>

      {/* STAR Cards */}
      <View style={styles.starCardsContainer}>
        <StarCard letter="S" color="bg-blue-500" title="Situation (Durum)" desc="Set the scene. Briefly describe the context, the team, and the specific problem you were facing. Keep it under 20% of your answer." tip='Example: "During Black Friday, our payment gateway started dropping 10% of transactions..."' />
        <StarCard letter="T" color="bg-indigo-500" title="Task (Görev)" desc="What was your specific responsibility in this situation? What was the goal you had to achieve?" tip='Example: "As the on-call engineer, I had to identify the root cause and restore the service immediately."' />
        <StarCard letter="A" color="bg-amber-500" title="Action (Aksiyon)" desc='This is the most important part (50% of your answer). Detail the specific steps YOU took. Use "I", not "We". Describe the technical tradeoffs and communication.' tip='Example: "I checked the Datadog logs and noticed a memory leak in the Redis cluster. I coordinated with the DevOps team to scale up the nodes horizontally..."' />
        <StarCard letter="R" color="bg-emerald-500" title="Result (Sonuç)" desc="What happened? Share quantifiable results (numbers, percentages, time saved). Mention what you learned." tip='Example: "We restored the service in 15 minutes. Later, I wrote a post-mortem and added an automated alert. Since then, downtime decreased by 99%."' />
      </View>

      <View style={styles.examplesContainer}>
        <Text style={styles.exampleHeading}>Real World Example: "Tell me about a time you failed."</Text>
        
        {/* Bad Example */}
        <View style={styles.badExampleCard}>
          <View style={styles.exampleHeaderRow}>
            <Icons.XCircle size={18} color="#e11d48" />
            <Text style={styles.badExampleTitle}>A Junior/Poor Answer (No Structure)</Text>
          </View>
          <Text style={styles.badExampleBody}>"One time the server crashed because of a bug in my code. It was stressful, but we worked together as a team to fix it and pushed a patch. My manager was mad but then it was okay. I learned to be more careful."</Text>
          <View style={styles.badExampleFooter}>
            <Text style={styles.badExampleFooterTitle}>Why it fails:</Text>
            <Text style={styles.badExampleFooterBody}>Vague. Uses "we" instead of "I". Doesn't explain the technical difficulty. Sounds defensive and lacks quantifiable results.</Text>
          </View>
        </View>

        {/* Good Example */}
        <View style={styles.goodExampleCard}>
          <View style={styles.exampleHeaderRow}>
            <Icons.CheckCircle2 size={18} color="#059669" />
            <Text style={styles.goodExampleTitle}>A Senior/FAANG Answer (STAR Method)</Text>
          </View>
          <View style={styles.goodExampleBody}>
            <Text style={styles.goodExampleText}><Text style={styles.goodExampleLabel}>(S)</Text> "While working on the V2 migration API, a misconfigured database index caused a severe lock, bringing down the staging environment for our testing team."</Text>
            <Text style={styles.goodExampleText}><Text style={styles.goodExampleLabel}>(T)</Text> "I was the lead developer on the feature, so it was my responsibility to unlock the database and prevent testing delays."</Text>
            <Text style={styles.goodExampleText}><Text style={styles.goodExampleLabel}>(A)</Text> "Instead of just restarting the database, I used pg_stat_activity to find the exact blocking query. I realized my batch-update script was missing a WHERE clause. I killed the specific PID, rewrote the script to use pagination (chunking 1000 records at a time), and added a unit test to verify the index usage."</Text>
            <Text style={styles.goodExampleText}><Text style={styles.goodExampleLabel}>(R)</Text> "The staging environment was back online in 20 minutes. My new paginated script ran 40% faster and was adopted as the standard for future migrations. I took full ownership in the post-mortem, which earned my manager's trust."</Text>
          </View>
        </View>
      </View>

      <View style={styles.tipCard}>
        <Icons.AlertCircle size={20} color="#2563eb" />
        <Text style={styles.tipText}>
          Now that you know the theory, go to the <Text style={styles.boldInline}>Reading</Text> tab to study real examples, and then use the <Text style={styles.boldInline}>Simulator</Text> to write your own STAR stories.
        </Text>
      </View>

      {onStartSimulator && (
        <TouchableOpacity 
          style={styles.startButton}
          onPress={onStartSimulator}
        >
          <Text style={styles.startButtonText}>Start Simulator</Text>
          <Icons.ArrowRight size={20} color="#ffffff" />
        </TouchableOpacity>
      )}
    </ScrollView>
  );
}

function StarCard({ letter, color, title, desc, tip }: { letter: string, color: string, title: string, desc: string, tip: string }) {
  const accentColor = STAR_COLORS[color] || colors.primary;
  return (
    <View style={[styles.starCard, shadow.sm]}>
      <View style={[styles.starAccent, { backgroundColor: accentColor }]} />
      <View style={styles.starContent}>
        <View style={[styles.starBadge, { backgroundColor: accentColor }]}>
          <Text style={styles.starLetter}>{letter}</Text>
        </View>
        <View style={styles.starTextContent}>
          <Text style={styles.starTitle}>{title}</Text>
          <Text style={styles.starDesc}>{desc}</Text>
          <View style={styles.starTipBox}>
            <Text style={styles.starTipText}>{tip}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: colors.slate50,
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 24,
    paddingBottom: 48,
  },
  headerRow: {
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '900',
    color: colors.slate800,
    fontFamily: 'serif',
  },
  introText: {
    color: colors.slate600,
    lineHeight: 26,
    marginBottom: 32,
  },
  boldDark: {
    fontWeight: '700',
    color: colors.slate800,
  },
  starCardsContainer: {
    marginBottom: 40,
  },
  examplesContainer: {
    marginBottom: 40,
  },
  exampleHeading: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 16,
  },
  badExampleCard: {
    backgroundColor: '#fff1f2',
    borderWidth: 1,
    borderColor: '#fecdd3',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
  },
  exampleHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 12,
  },
  badExampleTitle: {
    fontWeight: '700',
    color: '#9f1239',
  },
  badExampleBody: {
    color: '#881337',
    fontStyle: 'italic',
    marginBottom: 12,
  },
  badExampleFooter: {
    backgroundColor: '#ffe4e6',
    borderRadius: 8,
    padding: 12,
  },
  badExampleFooterTitle: {
    fontSize: 10,
    color: '#9f1239',
    fontWeight: '700',
  },
  badExampleFooterBody: {
    fontSize: 10,
    color: '#881337',
    marginTop: 4,
    lineHeight: 16,
  },
  goodExampleCard: {
    backgroundColor: '#ecfdf5',
    borderWidth: 1,
    borderColor: '#a7f3d0',
    borderRadius: 16,
    padding: 20,
  },
  goodExampleTitle: {
    fontWeight: '700',
    color: '#065f46',
  },
  goodExampleBody: {
    gap: 12,
  },
  goodExampleText: {
    color: '#064e3b',
    lineHeight: 26,
  },
  goodExampleLabel: {
    fontWeight: '700',
    color: '#047857',
  },
  tipCard: {
    backgroundColor: '#eff6ff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 24,
    flexDirection: 'row',
    alignItems: 'flex-start',
    gap: 12,
  },
  tipText: {
    flex: 1,
    color: '#1e3a5f',
    lineHeight: 26,
    fontSize: 12,
  },
  boldInline: {
    fontWeight: '700',
  },
  startButton: {
    backgroundColor: '#2563eb',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 16,
    borderRadius: 12,
    marginBottom: 48,
    ...shadow.sm,
  },
  startButtonText: {
    color: colors.white,
    fontWeight: '700',
    fontSize: 18,
    marginRight: 8,
  },
  // StarCard styles
  starCard: {
    backgroundColor: colors.white,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.slate200,
    marginBottom: 16,
    overflow: 'hidden',
    position: 'relative',
  },
  starAccent: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: 8,
  },
  starContent: {
    padding: 20,
    paddingLeft: 28,
    flexDirection: 'row',
  },
  starBadge: {
    width: 48,
    height: 48,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  starLetter: {
    color: colors.white,
    fontSize: 24,
    fontWeight: '900',
  },
  starTextContent: {
    flex: 1,
  },
  starTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: colors.slate800,
    marginBottom: 6,
  },
  starDesc: {
    fontSize: 12,
    color: colors.slate600,
    lineHeight: 20,
    marginBottom: 12,
  },
  starTipBox: {
    backgroundColor: colors.slate50,
    borderWidth: 1,
    borderColor: colors.slate100,
    borderRadius: 8,
    padding: 12,
  },
  starTipText: {
    fontSize: 10,
    color: colors.slate500,
    fontWeight: '500',
    fontStyle: 'italic',
    lineHeight: 18,
  },
});
