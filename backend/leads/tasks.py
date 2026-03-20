from celery import shared_task

@shared_task
def notify_new_lead(name):
    print(f"🔥 New lead created: {name}")