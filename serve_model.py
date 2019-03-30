
import tensorflow as tf
from tensorflow import saved_model as saved_model

export_dir = "./serve/"

PATH_TO_CKPT =  'trainedModels/ssd_mobilenet_RoadDamageDetector.pb'

builder = tf.saved_model.builder.SavedModelBuilder(export_dir)

detection_graph = tf.Graph()
with detection_graph.as_default():
    od_graph_def = tf.GraphDef()
    with tf.gfile.GFile(PATH_TO_CKPT, 'rb') as fid:
        serialized_graph = fid.read()
        od_graph_def.ParseFromString(serialized_graph)
        tf.import_graph_def(od_graph_def, name='')

with detection_graph.as_default():
    with tf.Session(graph=detection_graph) as sess:
        print([n.name for n in detection_graph.as_graph_def().node])

    # Definite input and output Tensors for detection_graph
        image_tensor = detection_graph.get_tensor_by_name('image_tensor:0')
        # Each box represents a part of the image where a particular object was detected.
        detection_boxes = detection_graph.get_tensor_by_name('detection_boxes:0')
        # Each score represent how level of confidence for each of the objects.
        # Score is shown on the result image, together with the class label.
        detection_scores = detection_graph.get_tensor_by_name('detection_scores:0')
        detection_classes = detection_graph.get_tensor_by_name('detection_classes:0')
        num_detections = detection_graph.get_tensor_by_name('num_detections:0')

        prediction_input_signature = {"image": saved_model.utils.build_tensor_info(image_tensor)}
        prediction_output_signature = {"detection_boxes": saved_model.utils.build_tensor_info(detection_boxes),
                                       "detection_scores": saved_model.utils.build_tensor_info(detection_scores),
                                       "detection_classes": saved_model.utils.build_tensor_info(detection_classes),
                                       "num_detections": saved_model.utils.build_tensor_info(num_detections)}

        prediction_signature = tf.saved_model.signature_def_utils.build_signature_def(
                    inputs=prediction_input_signature,
                    outputs=prediction_output_signature,
                    method_name=tf.saved_model.signature_constants.PREDICT_METHOD_NAME)

        builder.add_meta_graph_and_variables(sess,
                                             [tf.saved_model.tag_constants.SERVING],
                                             signature_def_map={"prediction": prediction_signature})

        builder.save()

