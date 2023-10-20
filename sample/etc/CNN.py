from roboflow import Roboflow

rf = Roboflow(api_key="fcUZokY1zF9aKAnCbDYA")
project = rf.workspace().project("wagyu")
model = project.version(2).model

# # infer on a local image
# print(model.predict("WagyuStripSteak_(8324549421).jpg").json())

# # infer on an image hosted elsewhere
# print(model.predict("URL_OF_YOUR_IMAGE", hosted=True).json())

# save an image annotated with your predictions
model.predict("WagyuStripSteak_(8324549421).jpg").save("prediction.jpg")