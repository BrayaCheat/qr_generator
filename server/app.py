from flask import Flask, request, send_file
import qrcode
from io import BytesIO

app = Flask(__name__)

@app.route('/generate', methods=['POST'])
def generate_qr():
    # Get the URL from the request JSON
    data = request.json
    url = data.get('url')
    
    if not url:
        return {"error": "URL parameter is missing"}, 400
    
    # Create a QR code object
    qr = qrcode.QRCode(
        version=1,
        error_correction=qrcode.constants.ERROR_CORRECT_L,
        box_size=10,
        border=4,
    )
    
    # Add the URL data to the QR code
    qr.add_data(f"https://{url}")
    qr.make(fit=True)
    
    # Create an image from the QR code instance
    img = qr.make_image(fill='black', back_color='white')
    
    # Save image to a BytesIO object
    img_io = BytesIO()
    img.save(img_io, 'PNG')
    img_io.seek(0)
    
    # Return the image as a response
    return send_file(img_io, mimetype='image/png', as_attachment=True, download_name=url)

if __name__ == '__main__':
    app.run(debug=True)
