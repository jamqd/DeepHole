import json
import tensorflow as tf
import urllib.request

def lambda_handler(event, context):
    img_url = str(event['queryStringParameters']['img_url'])
    urllib.request.urlretrieve("https://springml.com/wp-content/uploads/2018/05/screenshot5.jpg", "/tmp/report.jpg")
    
    img_raw = tf.read_file("/tmp/report.jpg")
    img_tensor = tf.image.decode_image(img_raw)

    # pass tensor to feed dict

    return {
        'statusCode': 200,
        'body': json.dumps(img_url)
    }