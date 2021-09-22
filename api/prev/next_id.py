next_ids = {}

def get_next_id(entity):
    global next_ids

    next_id = next_ids.get(entity, 1)

    if next_id == 1:
        next_ids[entity] = 2

    else:
        next_ids[entity] = next_id + 1

    return next_id
