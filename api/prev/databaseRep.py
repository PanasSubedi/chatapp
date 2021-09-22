entities = {}

def set(entity, data):
    global entities
    entities[entity] = data

def get(entity):
    global entities
    return entities.get(entity, [])

def add(entity, data):
    global entities
    entityList = entities.get(entity, [])
    entityList.append(data)
    entities[entity] = entityList
