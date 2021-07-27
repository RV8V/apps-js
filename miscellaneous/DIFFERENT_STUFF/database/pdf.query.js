const scanTypeName = (await ScanType.query())
  .map(scanType => scanType.ScanTypeName.toLowerCase())
  .filter(scanType => payload.ScanServiceName.toLowerCase().includes(scanType)).pop()

const [scanType] = await ScanType.query()
  .where('scan_types.ScanTypeName', '=', scanTypeName)

const scanService = await ScanService.query()
  .insert({
    ScanTypeID: scanType.ID,
    ScanServiceName: payload.ScanServiceName,
    CPTCode: payload.CPTCode
  })
  .catch(err => {
    throw err
  })

const location = await MfpPoLocations.query()
  .insert({
    POID: session.organizationId,
    Name: payload.LocationName,
    Address1: payload.Address1,
    City: payload.City,
    State: payload.State,
    ZipCode: payload.ZipCode,
    Phone: payload.LocationPhone,
    DefaultFax: payload.DefaultFax,
    Longitude: payload.Longitude,
    Latitude: payload.Latitude,
    CreatedBy: session.userId,
    UpdatedBy: session.userId
  })
  .catch(err => {
    throw err
  })
