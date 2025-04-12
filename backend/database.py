import os
from supabase import create_client

supabase_url = os.environ.get("SUPABASE_URL", "your-supabase-url")
supabase_key = os.environ.get("SUPABASE_KEY", "your-supabase-service-key")

supabase = create_client(supabase_url, supabase_key)

def get_experiments():
    
    response = supabase.table("experimentos").select("*").execute()
    return response.data

def get_experiment(experiment_id):
    response = supabase.table("experimentos").select("*").eq("id", experiment_id).execute()
    return response.data[0] if response.data else None

def create_experiment(experiment_data):
    response = supabase.table("experimentos").insert(experiment_data).execute()
    return response.data[0] if response.data else None

def find_experiments_by_items(items):
    all_experiments = get_experiments()
    matching_experiments = []
    for experiment in all_experiments:
        if any(item in experiment["items"] for item in items):
            match_count = sum(1 for item in items if item in experiment["items"])
            total_required = len(experiment["items"])
            match_percentage = match_count / total_required
            
            matching_experiments.append({
                "experiment": experiment,
                "match_percentage": match_percentage,
                "missing_items": [item for item in experiment["items"] if item not in items]
            })
  
    matching_experiments.sort(key=lambda x: x["match_percentage"], reverse=True)
    
    return matching_experiments


def save_chat_interaction(interaction_data):
    response = supabase.table("interacoes_chat").insert(interaction_data).execute()
    return response.data[0] if response.data else None

def get_user_chat_history(user_id):
    response = supabase.table("interacoes_chat").select("*").eq("user_id", user_id).order("timestamp").execute()
    return response.data