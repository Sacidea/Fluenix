import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import * as Icons from 'lucide-react-native';

export function BehavioralHandbook() {
  return (
    <ScrollView style={{ flex: 1 }} className="bg-slate-50" contentContainerClassName="px-4 pt-6 pb-12">
      <View className="mb-6 flex-row items-center gap-3">
        <Icons.BookOpen size={28} color="#3b82f6" />
        <Text className="text-2xl font-black text-slate-800 font-serif">The STAR Method Guide</Text>
      </View>

      <Text className="text-slate-600 leading-relaxed mb-8">
        In FAANG and top-tier tech interviews, your technical skills only get you past the coding round. 
        To pass the "Behavioral" or "Leadership" rounds, you must prove you can handle pressure, work in a team, and take ownership.
        The industry standard way to answer these questions is the <Text className="font-bold text-slate-800">STAR Method</Text>.
      </Text>

      {/* STAR Cards */}
      <View className="mb-10">
        <StarCard letter="S" color="bg-blue-500" title="Situation (Durum)" desc="Set the scene. Briefly describe the context, the team, and the specific problem you were facing. Keep it under 20% of your answer." tip='Example: "During Black Friday, our payment gateway started dropping 10% of transactions..."' />
        <StarCard letter="T" color="bg-indigo-500" title="Task (Görev)" desc="What was your specific responsibility in this situation? What was the goal you had to achieve?" tip='Example: "As the on-call engineer, I had to identify the root cause and restore the service immediately."' />
        <StarCard letter="A" color="bg-amber-500" title="Action (Aksiyon)" desc='This is the most important part (50% of your answer). Detail the specific steps YOU took. Use "I", not "We". Describe the technical tradeoffs and communication.' tip='Example: "I checked the Datadog logs and noticed a memory leak in the Redis cluster. I coordinated with the DevOps team to scale up the nodes horizontally..."' />
        <StarCard letter="R" color="bg-emerald-500" title="Result (Sonuç)" desc="What happened? Share quantifiable results (numbers, percentages, time saved). Mention what you learned." tip='Example: "We restored the service in 15 minutes. Later, I wrote a post-mortem and added an automated alert. Since then, downtime decreased by 99%."' />
      </View>

      <View className="mb-10">
        <Text className="text-xl font-bold text-slate-800 mb-4">Real World Example: "Tell me about a time you failed."</Text>
        
        {/* Bad Example */}
        <View className="bg-rose-50 border border-rose-200 rounded-2xl p-5 mb-4">
          <View className="flex-row items-center gap-2 mb-3">
            <Icons.XCircle size={18} color="#e11d48" />
            <Text className="font-bold text-rose-800">A Junior/Poor Answer (No Structure)</Text>
          </View>
          <Text className="text-rose-900 italic mb-3">"One time the server crashed because of a bug in my code. It was stressful, but we worked together as a team to fix it and pushed a patch. My manager was mad but then it was okay. I learned to be more careful."</Text>
          <View className="bg-rose-100 rounded-lg p-3">
            <Text className="text-xs text-rose-800 font-bold">Why it fails:</Text>
            <Text className="text-xs text-rose-900 mt-1 leading-tight">Vague. Uses "we" instead of "I". Doesn't explain the technical difficulty. Sounds defensive and lacks quantifiable results.</Text>
          </View>
        </View>

        {/* Good Example */}
        <View className="bg-emerald-50 border border-emerald-200 rounded-2xl p-5">
          <View className="flex-row items-center gap-2 mb-3">
            <Icons.CheckCircle2 size={18} color="#059669" />
            <Text className="font-bold text-emerald-800">A Senior/FAANG Answer (STAR Method)</Text>
          </View>
          <View className="gap-3">
            <Text className="text-emerald-900 leading-relaxed"><Text className="font-bold text-emerald-700">(S)</Text> "While working on the V2 migration API, a misconfigured database index caused a severe lock, bringing down the staging environment for our testing team."</Text>
            <Text className="text-emerald-900 leading-relaxed"><Text className="font-bold text-emerald-700">(T)</Text> "I was the lead developer on the feature, so it was my responsibility to unlock the database and prevent testing delays."</Text>
            <Text className="text-emerald-900 leading-relaxed"><Text className="font-bold text-emerald-700">(A)</Text> "Instead of just restarting the database, I used pg_stat_activity to find the exact blocking query. I realized my batch-update script was missing a WHERE clause. I killed the specific PID, rewrote the script to use pagination (chunking 1000 records at a time), and added a unit test to verify the index usage."</Text>
            <Text className="text-emerald-900 leading-relaxed"><Text className="font-bold text-emerald-700">(R)</Text> "The staging environment was back online in 20 minutes. My new paginated script ran 40% faster and was adopted as the standard for future migrations. I took full ownership in the post-mortem, which earned my manager's trust."</Text>
          </View>
        </View>
      </View>

      <View className="bg-blue-50 rounded-2xl p-5 mb-12 flex-row items-start gap-3">
        <Icons.AlertCircle size={24} color="#2563eb" className="mt-1" />
        <Text className="flex-1 text-blue-900 leading-relaxed font-medium">
          Now that you know the theory, go to the <Text className="font-bold">Reading Practice</Text> tab to study real examples, and then use the <Text className="font-bold">Simulator</Text> to write your own STAR stories.
        </Text>
      </View>
    </ScrollView>
  );
}

function StarCard({ letter, color, title, desc, tip }: { letter: string, color: string, title: string, desc: string, tip: string }) {
  return (
    <View className="bg-white rounded-2xl border border-slate-200 shadow-sm mb-4 overflow-hidden relative" style={{ shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 10 }}>
      <View className={`absolute top-0 left-0 bottom-0 w-2 ${color}`} />
      <View className="p-5 pl-7 flex-row">
        <View className={`w-12 h-12 rounded-xl items-center justify-center mr-4 ${color}`}>
          <Text className="text-white text-2xl font-black">{letter}</Text>
        </View>
        <View className="flex-1">
          <Text className="text-lg font-bold text-slate-800 mb-1.5">{title}</Text>
          <Text className="text-sm text-slate-600 leading-relaxed mb-3">{desc}</Text>
          <View className="bg-slate-50 border border-slate-100 rounded-lg p-3">
            <Text className="text-xs text-slate-500 font-medium italic leading-relaxed">{tip}</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
