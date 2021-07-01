import boto3
import botocore
import os
import uuid

#s3_helpers and related code relied heavily on Juliet Shafto's "Using S3 for image upload with Flask"
# https://hackmd.io/@jpshafto/SyWY45KGu

BUCKET_NAME = os.environ.get("S3_BUCKET")
S3_LOCATION = f"http://{BUCKET_NAME}.s3.amazonaws.com/"

s3 = boto3.client(
   "s3",
   aws_access_key_id=os.environ.get("S3_KEY"),
   aws_secret_access_key=os.environ.get("S3_SECRET")
)

ALLOWED_EXTENSIONS = {"pdf", "png", "jpg", "jpeg", "gif"}

#parsing out file extension
def allowed_file(filename):
    return "." in filename and \
           filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

#creating new filename with UUID
def get_unique_filename(filename):
    ext = filename.rsplit(".", 1)[1].lower()
    unique_filename = uuid.uuid4().hex
    return f"{unique_filename}.{ext}"

def upload_file_to_s3(file, acl="public-read"):
    try:
        s3.upload_fileobj(
            file,
            BUCKET_NAME,
            file.filename,
            ExtraArgs={
                "ACL": acl,  #public read?
                "ContentType": file.content_type
            }
        )
    except Exception as e:
        # in case the our s3 upload fails
        return {"errors": str(e)}

    return {"url": f"{S3_LOCATION}{file.filename}"}
