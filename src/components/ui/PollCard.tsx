
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface PollOption {
  id: number;
  text: string;
  votes: number;
}

interface PollCardProps {
  question: string;
  options: PollOption[];
  totalVotes: number;
  endTime: string;
}

const PollCard = ({ question, options, totalVotes, endTime }: PollCardProps) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [hasVoted, setHasVoted] = useState(false);
  const [localTotalVotes, setLocalTotalVotes] = useState(totalVotes);
  const [pollOptions, setPollOptions] = useState(options);

  const handleVote = () => {
    if (selectedOption !== null) {
      const updatedOptions = pollOptions.map((option) => {
        if (option.id === selectedOption) {
          return { ...option, votes: option.votes + 1 };
        }
        return option;
      });
      
      setPollOptions(updatedOptions);
      setLocalTotalVotes(localTotalVotes + 1);
      setHasVoted(true);
    }
  };

  const calculatePercentage = (votes: number) => {
    if (localTotalVotes === 0) return 0;
    return Math.round((votes / localTotalVotes) * 100);
  };

  return (
    <div className="poll-card animate-fade-in-up">
      <h3 className="font-bold text-xl mb-4">{question}</h3>
      
      <div className="space-y-3 mb-6">
        {pollOptions.map((option) => (
          <div key={option.id} className="relative">
            <button
              onClick={() => !hasVoted && setSelectedOption(option.id)}
              disabled={hasVoted}
              className={`w-full text-left p-3 rounded-lg border transition-all ${
                hasVoted 
                  ? 'cursor-default bg-muted' 
                  : 'hover:border-kenya-purple cursor-pointer'
              } ${
                selectedOption === option.id 
                  ? 'border-kenya-purple bg-kenya-purple/5' 
                  : 'border-muted bg-transparent'
              }`}
            >
              <div className="flex justify-between items-center relative z-10">
                <span>{option.text}</span>
                {hasVoted && (
                  <span className="font-medium">{calculatePercentage(option.votes)}%</span>
                )}
              </div>
              
              {hasVoted && (
                <div 
                  className="absolute top-0 left-0 h-full bg-kenya-purple/20 rounded-lg transition-all duration-1000 ease-out"
                  style={{ width: `${calculatePercentage(option.votes)}%` }}
                />
              )}
            </button>
          </div>
        ))}
      </div>
      
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {hasVoted ? (
            <span>{localTotalVotes} votes • Poll ends {endTime}</span>
          ) : (
            <span>Poll ends {endTime}</span>
          )}
        </div>
        
        {!hasVoted ? (
          <Button 
            onClick={handleVote} 
            disabled={selectedOption === null}
            className="bg-kenya-purple hover:bg-kenya-purple/90 text-white"
          >
            Vote
          </Button>
        ) : (
          <Button variant="outline" className="border-kenya-purple text-kenya-purple">
            Share Results
          </Button>
        )}
      </div>
    </div>
  );
};

export default PollCard;
